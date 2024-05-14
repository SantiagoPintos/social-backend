import { Post } from "@/entities/Post";
import { postDTO } from "@/dtos/post.dto";
import { likeDTO } from "@/dtos/like.dto";

export class postMapper{
    toDto(post: Post): postDTO{
        const dto: postDTO = {
            id: post.id,
            autorId: post.autorId,
            content: post.content,
            date: post.date,
            likes: post.likes.map((l) => {
                const like: likeDTO = {
                    userId: l.user.id,
                    postId: l.post ? l.post.id : l.comment.id,
                    date: l.date
                }
                return like;
            })
        }

        return dto;
    }
}

export default new postMapper();