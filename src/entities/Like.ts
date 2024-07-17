import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";

export class Like{
    id!: number;
    date!: Date;
    user!: User;
    post!: Post;
    comment!: Comment;

    constructor(id: number, date: Date, user: User, post: Post, comment: Comment) {
        this.id = id;
        this.date = date;
        this.user = user;
        this.post = post;
        this.comment = comment;
    }
}