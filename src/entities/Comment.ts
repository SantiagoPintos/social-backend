import { Entity, Column, ManyToOne } from "typeorm";
import { Publication } from "./Publication";
import { Post } from "./Post";

@Entity()
export class Comment extends Publication {
  @Column()
  parentPostId!: number;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;
}
