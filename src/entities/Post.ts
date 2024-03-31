import { Entity, OneToMany } from "typeorm";
import { Publication } from "./Publication";
import { Comment } from "./Comment";

@Entity()
export class Post extends Publication {
    @OneToMany(() => Comment, (comment) => comment.parentPost)
    comments: Comment[] | undefined
}
