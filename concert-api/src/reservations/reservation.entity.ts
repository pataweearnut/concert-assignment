import { ReservationStatus } from '../utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
