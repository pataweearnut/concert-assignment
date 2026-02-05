import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Concert } from './concerts.entity';
import { Reservation } from '../reservations/reservation.entity';
import { ConcertsService } from '../concerts/concerts.service';
import { createTestModule } from '../../test/test-utils';
import { ReservationStatus } from '../utils/constants';

describe('ConcertsService (integration, event-based)', () => {
  let service: ConcertsService;
  let concertRepo: Repository<Concert>;
  let reservationRepo: Repository<Reservation>;

  beforeEach(async () => {
    const { moduleRef } = await createTestModule();
    service = moduleRef.get(ConcertsService);
    concertRepo = moduleRef.get(getRepositoryToken(Concert));
    reservationRepo = moduleRef.get(getRepositoryToken(Reservation));
  });

  it('creates concert with availableSeats equal to totalSeats', async () => {
    const concert = await service.create({
      name: 'Rock Festival',
      description: 'Live show',
      totalSeats: 10,
    });

    expect(concert.availableSeats).toBe(10);
  });

  it('returns all concerts', async () => {
    await service.create({
      name: 'Concert A',
      description: 'A',
      totalSeats: 10,
    });

    await service.create({
      name: 'Concert B',
      description: 'B',
      totalSeats: 5,
    });

    const concerts = await service.findAll();
    expect(concerts.length).toBeGreaterThanOrEqual(2);
  });

  it('allows a user to reserve a seat', async () => {
    const concert = await service.create({
      name: 'Jazz Night',
      description: 'Smooth jazz',
      totalSeats: 5,
    });

    await service.reserve(concert.id, 'user-1');

    const updated = await concertRepo.findOneBy({ id: concert.id });
    expect(updated.availableSeats).toBe(4);

    const latest = await reservationRepo.findOne({
      where: { concertId: concert.id, userId: 'user-1' },
      order: { createdAt: 'DESC' },
    });

    expect(latest.status).toBe(ReservationStatus.RESERVE);
  });

  it('prevents reserving again when user already has active reservation', async () => {
    const concert = await service.create({
      name: 'EDM',
      description: 'Party',
      totalSeats: 5,
    });

    await service.reserve(concert.id, 'user-1');

    await expect(service.reserve(concert.id, 'user-1')).rejects.toThrow(
      'Duplicate reservation',
    );

    const updated = await concertRepo.findOneBy({ id: concert.id });
    expect(updated.availableSeats).toBe(4);
  });

  it('throws error when no seats are left', async () => {
    const concert = await service.create({
      name: 'Sold Out',
      description: 'None',
      totalSeats: 1,
    });

    await service.reserve(concert.id, 'user-1');

    await expect(service.reserve(concert.id, 'user-2')).rejects.toThrow(
      'No seats left',
    );
  });

  it('throws NotFoundException when reserving invalid concert', async () => {
    await expect(service.reserve(9999, 'user-x')).rejects.toThrow(
      'Concert not found',
    );
  });

  it('does not overbook seats under concurrent requests', async () => {
    const concert = await service.create({
      name: 'Rock',
      description: 'Live',
      totalSeats: 1,
    });

    await Promise.allSettled([
      service.reserve(concert.id, 'user-1'),
      service.reserve(concert.id, 'user-2'),
    ]);

    const updated = await concertRepo.findOneBy({ id: concert.id });
    expect(updated.availableSeats).toBe(0);

    const latestReservations = await reservationRepo.find({
      where: { concertId: concert.id },
      order: { createdAt: 'DESC' },
    });

    const activeCount = latestReservations.filter(
      (r) => r.status === ReservationStatus.RESERVE,
    ).length;

    expect(activeCount).toBe(1);
  });

  it('creates cancel transaction and restores seat', async () => {
    const concert = await service.create({
      name: 'Pop Concert',
      description: 'Fun',
      totalSeats: 1,
    });

    await service.reserve(concert.id, 'user-1');
    await service.cancel(concert.id, 'user-1');

    const updated = await concertRepo.findOneBy({ id: concert.id });
    expect(updated.availableSeats).toBe(1);

    const history = await reservationRepo.find({
      where: { concertId: concert.id, userId: 'user-1' },
      order: { createdAt: 'ASC' },
    });

    expect(history.map((h) => h.status)).toEqual([
      ReservationStatus.RESERVE,
      ReservationStatus.CANCEL,
    ]);
  });

  it('does nothing when cancelling without active reservation', async () => {
    const concert = await service.create({
      name: 'No Cancel',
      description: 'None',
      totalSeats: 2,
    });

    await expect(service.cancel(concert.id, 'user-x')).resolves.not.toThrow();

    const updated = await concertRepo.findOneBy({ id: concert.id });
    expect(updated.availableSeats).toBe(2);

    const history = await reservationRepo.find({
      where: { concertId: concert.id },
    });

    expect(history.length).toBe(0);
  });

  it('cancel is idempotent (second cancel has no effect)', async () => {
    const concert = await service.create({
      name: 'Idempotent',
      description: 'Cancel twice',
      totalSeats: 1,
    });

    await service.reserve(concert.id, 'user-1');
    await service.cancel(concert.id, 'user-1');
    await service.cancel(concert.id, 'user-1');

    const updated = await concertRepo.findOneBy({ id: concert.id });
    expect(updated.availableSeats).toBe(1);

    const history = await reservationRepo.find({
      where: { concertId: concert.id, userId: 'user-1' },
    });

    expect(history.length).toBe(2);
  });

  it('deletes a concert', async () => {
    const concert = await service.create({
      name: 'Delete Me',
      description: 'Temp',
      totalSeats: 3,
    });

    await service.delete(concert.id);

    const found = await concertRepo.findOneBy({ id: concert.id });
    expect(found).toBeNull();
  });

  it('throws error when deleting non-existing concert', async () => {
    await expect(service.delete(9999)).rejects.toThrow('Concert not found');
  });
});
