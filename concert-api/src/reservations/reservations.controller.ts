import { Controller, Get, UseGuards } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";

@Controller('reservations')
export class ReservationsController {
  constructor(private service: ReservationsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
