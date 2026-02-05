import { ReservationStatus } from "src/utils/constants";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concertId: number;

  @Column()
  userId: string;

  @Column()
  status: ReservationStatus;

  @CreateDateColumn()
  createdAt: Date;
}
