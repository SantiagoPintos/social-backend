import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserFollower {
  @PrimaryGeneratedColumn()
    id!: number;

  @ManyToOne(() => User, (user) => user.followers)
    followed!: User;

  @ManyToOne(() => User, (user) => user.following)
    follower!: User;
}
