import { likeDTO } from "./like.dto"

interface CommentDTO{
    id: number,
    autorId: number,
    content: string,
    date: Date,
    likes: likeDTO[],
    parentPostId: number
}

export { CommentDTO }
