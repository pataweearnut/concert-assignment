import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ConcertsService } from "./concerts.service";
import { CreateConcertDto } from "./dto/create-concert.dto";

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
}
