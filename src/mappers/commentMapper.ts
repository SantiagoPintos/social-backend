import { Comment } from "@/entities/Comment";
import { CommentDTO } from "@/dtos/comment.dto";
import userMapper from "./userMapper";
import UserService from "@/services/UserService";
import likeMapper from "./likeMapper";

class commentMapper{
    async toDTO(comment: Comment): Promise<CommentDTO>{
        const dto: CommentDTO = {
            id: comment.id,
            autorId: userMapper.toTimelineDTO(await UserService.getUserById(comment.autorId)),
            content: comment.content,
            date: comment.date,
            likes: comment.likes.map((l) => {
                return likeMapper.toDTO(l);
            }),
            parentPostId: comment.parentPost.id
        }
        return dto;
    }
}

export default new commentMapper();
