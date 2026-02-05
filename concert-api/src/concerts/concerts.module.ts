import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Concert } from "./concerts.entity";
import { ConcertsController } from "./concerts.controller";
import { ConcertsService } from "./concerts.service";
import { Reservation } from "../reservations/reservation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Concert, Reservation])],
    controllers: [ConcertsController],
    providers: [ConcertsService],
})
export class ConcertsModule { }
