import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['concertId', 'userId'])
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
  reservedAt: Date;

  @Column({ nullable: true })
  cancelledAt: Date | null;
}
