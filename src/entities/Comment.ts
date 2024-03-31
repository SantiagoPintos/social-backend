import { Entity, ManyToOne } from "typeorm";
import { Publication } from "./Publication";
import { Post } from "./Post";

@Entity()
export class Comment extends Publication {
  @ManyToOne(() => Post, (post) => post.comments)
  parentPost!: Post;
}
