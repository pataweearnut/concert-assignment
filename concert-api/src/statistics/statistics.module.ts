import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Concert } from '../concerts/concerts.entity';
import { Reservation } from '../reservations/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Concert])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
