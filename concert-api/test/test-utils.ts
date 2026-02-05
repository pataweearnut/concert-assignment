import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from '../src/concerts/concerts.entity';
import { Reservation } from '../src/reservations/reservation.entity';
import { ConcertsService } from '../src/concerts/concerts.service';
import { ReservationsService } from '../src/reservations/reservations.service';
import { StatisticsService } from '../src/statistics/statistics.service';

export async function createTestModule() {
  const moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        entities: [Concert, Reservation],
      }),
      TypeOrmModule.forFeature([Concert, Reservation]),
    ],
    providers: [ConcertsService, ReservationsService, StatisticsService],
  }).compile();

  return { moduleRef };
}