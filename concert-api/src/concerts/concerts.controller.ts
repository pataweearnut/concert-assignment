import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ConcertsService } from "./concerts.service";
import { CreateConcertDto } from "./dto/create-concert.dto";
import { UserId } from "src/common/decorators/user-id.decorator";

@Controller('concerts')
export class ConcertsController {
  constructor(private service: ConcertsService) {}

  @Post()
  create(@Body() dto: CreateConcertDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Post(':id/reserve')
  reserve(
    @Param('id') id: number,
    @UserId() userId: string,
  ) {
    return this.service.reserve(id, userId);
  }

  @Post(':id/cancel')
  cancel(
    @Param('id') id: number,
    @UserId() userId: string,
  ) {
    return this.service.cancel(id, userId);
  }
}
