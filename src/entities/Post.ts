import { Entity, OneToMany } from "typeorm";
import { Publication } from "./Publication";
import { Comment } from "./Comment";
import { Like } from "./Like";

@Entity()
export class Post extends Publication {
    @OneToMany(() => Comment, (comment) => comment.parentPost)
    comments: Comment[] | undefined

    @OneToMany(() => Like, (like) => like.post)
    likes!: Like[]
}
