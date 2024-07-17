import { Publication } from "./Publication";
import { Post } from "./Post";
import { Like } from "./Like";

export class Comment extends Publication {
  parentPost!: Post;
  likes!: Like[];

  constructor(autor: number, content: string, parentPost: Post) {
    super(autor, content);
    this.parentPost = parentPost;
    this.likes = new Array<Like>();
  }
}
