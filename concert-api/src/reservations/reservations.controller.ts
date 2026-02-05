import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AdminGuard } from '../common/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private service: ReservationsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
