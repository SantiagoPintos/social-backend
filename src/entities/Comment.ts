import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Publication } from "./Publication";
import { Post } from "./Post";
import { Like } from "./Like";

@Entity()
export class Comment extends Publication {
  @ManyToOne(() => Post, (post) => post.comments)
  parentPost!: Post;

  @OneToMany(() => Like, (like) => like.comment)
  likes!: Like[];
}
