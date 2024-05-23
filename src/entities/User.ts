import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Like } from "./Like";
import { UserFollower } from "./UserFollower";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string;

  @Column()
    lastName!: string;

  @Unique("unique_username", ["username"])
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

  @OneToMany(() => UserFollower, userFollower => userFollower.followed)
    followers!: UserFollower[];

  @OneToMany(() => UserFollower, userFollower => userFollower.follower)
    following!: UserFollower[];
}

