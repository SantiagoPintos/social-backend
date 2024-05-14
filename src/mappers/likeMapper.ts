import { Like } from "@/entities/Like";
import { likeDTO } from "@/dtos/like.dto";

class likeMapper{
    toDTO(like: Like): likeDTO{
        const dto: likeDTO = {
            userId: like.user.id,
            postId: like.post ? like.post.id : like.comment.id,
            date: like.date
        }
        return dto;
    }
}

export default new likeMapper();
