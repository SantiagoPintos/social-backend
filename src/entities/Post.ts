import { Publication } from "./Publication";
import { Comment } from "./Comment";
import { Like } from "./Like";

export class Post extends Publication {
    comments: Comment[]
    likes!: Like[]

    constructor(autor: number, content: string) {
        super(autor, content);
        this.comments = new Array<Comment>();
        this.likes = new Array<Like>();
    }
}
