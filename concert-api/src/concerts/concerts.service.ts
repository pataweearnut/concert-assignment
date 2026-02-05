import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateConcertDto } from "./dto/create-concert.dto";
import { Concert } from "./concerts.entity";

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private concertRepo: Repository<Concert>,
  ) {}

  create(dto: CreateConcertDto) {
    return this.concertRepo.save({
      ...dto,
      availableSeats: dto.totalSeats,
    });
  }

  findAll() {
    return this.concertRepo.find();
  }

  delete(id: number) {
    return this.concertRepo.delete(id);
  }
}
