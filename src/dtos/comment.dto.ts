import { likeDTO } from "./like.dto"
import { UserToPostDTO } from "./user.dto"

interface CommentDTO{
    id: number,
    autorId: UserToPostDTO,
    content: string,
    date: Date,
    likes: likeDTO[],
    parentPostId: number
}

export { CommentDTO }
