import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './concerts.entity';
import { Reservation } from '../reservations/reservation.entity';
import { ReservationStatus } from 'src/utils/constants';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,

    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(dto: CreateConcertDto): Promise<Concert> {
    return this.concertRepo.save({
      ...dto,
      availableSeats: dto.totalSeats,
    });
  }

  async findAll(): Promise<Concert[]> {
    return this.concertRepo.find();
  }

  async delete(id: number): Promise<void> {
    const { affected } = await this.concertRepo.delete(id);
    if (!affected) {
      throw new NotFoundException('Concert not found');
    }
  }

  async reserve(concertId: number, userId: string): Promise<Reservation> {
    await this.assertConcertExists(concertId);

    const seatUpdated = await this.decrementSeat(concertId);
    if (!seatUpdated) {
      throw new BadRequestException('No seats left');
    }

    try {
      return await this.reservationRepo.save({
        concertId,
        userId,
        status: ReservationStatus.RESERVE,
      });
    } catch (error) {
      await this.restoreSeat(concertId);

      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new BadRequestException('Duplicate reservation');
      }

      throw error;
    }
  }

  async cancel(concertId: number, userId: string): Promise<void> {
    await this.assertConcertExists(concertId);

    await this.concertRepo.manager.transaction(async (manager) => {
      const reservationRepo = manager.getRepository(Reservation);
      const concertRepo = manager.getRepository(Concert);

      const { affected } = await reservationRepo.delete({
        concertId,
        userId,
        status: ReservationStatus.RESERVE,
      });

      if (!affected) return;

      await concertRepo.increment(
        { id: concertId },
        'availableSeats',
        1,
      );

      await reservationRepo.save({
        concertId,
        userId,
        status: ReservationStatus.CANCEL,
      });
    });
  }

  private async decrementSeat(concertId: number): Promise<boolean> {
    const result = await this.concertRepo
      .createQueryBuilder()
      .update(Concert)
      .set({ availableSeats: () => 'availableSeats - 1' })
      .where('id = :id', { id: concertId })
      .andWhere('availableSeats > 0')
      .execute();

    return result.affected === 1;
  }

  private async restoreSeat(concertId: number): Promise<void> {
    await this.concertRepo.increment(
      { id: concertId },
      'availableSeats',
      1,
    );
  }

  private async assertConcertExists(concertId: number): Promise<void> {
    const exists = await this.concertRepo.findOne({
      where: { id: concertId },
    });

    if (!exists) {
      throw new NotFoundException('Concert not found');
    }
  }
}
