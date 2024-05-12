import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class Like{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @ManyToOne(() => User, (user) => user.likes)
    user!: User;

    @ManyToOne(() => Post, { nullable: true })
    post!: Post;

    @ManyToOne(() => Comment, { nullable: true })
    comment!: Comment;
}