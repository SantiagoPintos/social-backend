import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Like } from "./Like";

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

  @Column()
    profileImage!: string;

  @OneToMany(() => Like, (like) => like.user)
    likes!: Like[];

}

