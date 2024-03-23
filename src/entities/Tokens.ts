import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    token!: string;

  @Column()
    userId!: number;

  @Column()
    generated!: Date;
}
