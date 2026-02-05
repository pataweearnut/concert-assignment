import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';
import { Concert } from '../concerts/concerts.entity';
import { ReservationStatus } from '../utils/constants';

export interface StatisticsResult {
  totalSeats: number;
  totalReserved: number;
  totalCanceled: number;
}

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,

    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,
  ) {}

  async getStatistics(): Promise<StatisticsResult> {
    const [seatRow, totalReserved, totalCanceled] = await Promise.all([
      this.concertRepo
        .createQueryBuilder('concert')
        .select('COALESCE(SUM(concert.totalSeats), 0)', 'totalSeats')
        .getRawOne<{ totalSeats: number }>(),

      this.reservationRepo.count({
        where: { status: ReservationStatus.RESERVE },
      }),

      this.reservationRepo.count({
        where: { status: ReservationStatus.CANCEL },
      }),
    ]);

    return {
      totalSeats: Number(seatRow.totalSeats),
      totalReserved,
      totalCanceled,
    };
  }
}
