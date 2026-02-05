import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  totalSeats: number;

  @Column()
  availableSeats: number;

  @CreateDateColumn()
  createdAt: Date;
}
