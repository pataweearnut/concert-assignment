import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ConcertsService } from "./concerts.service";
import { CreateConcertDto } from "./dto/create-concert.dto";
import { UserId } from "../common/decorators/user-id.decorator";
import { AdminGuard } from "../common/guards/admin.guard";
import { UserGuard } from "../common/guards/user.gaurd";

@Controller('concerts')
export class ConcertsController {
  constructor(private service: ConcertsService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: CreateConcertDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('reservations')
  findAllWithReservation(
    @UserId() userId: string,
  ) {
    return this.service.findAllWithReservation(userId);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @UseGuards(UserGuard)
  @Post(':id/reserve')
  reserve(
    @Param('id') id: number,
    @UserId() userId: string,
  ) {
    return this.service.reserve(id, userId);
  }

  @UseGuards(UserGuard)
  @Post(':id/cancel')
  cancel(
    @Param('id') id: number,
    @UserId() userId: string,
  ) {
    return this.service.cancel(id, userId);
  }
}
