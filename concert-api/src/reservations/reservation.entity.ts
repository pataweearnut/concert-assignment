import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId', 'concertId'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concertId: number;

  @Column()
  userId: string;

  @Column()
  status: 'RESERVE' | 'CANCEL';

  @CreateDateColumn()
  createdAt: Date;
}
