import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column()
    lastName!: string;

  @Column()
    username!: string;

  @Column()
    email!: string;

  @Column()
    password!: string;
}

