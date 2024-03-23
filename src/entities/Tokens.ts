import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Tokens {
  @PrimaryColumn()
    userId!: number;

  @Column()
    token!: string;

  @Column()
    generated!: Date;
}
