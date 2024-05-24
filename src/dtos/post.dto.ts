import { likeDTO } from "./like.dto"
import { CommentDTO } from "./comment.dto"
import { UserToPostDTO } from "./user.dto"


interface newPostDTO{
    autorId: number,
    content: string,
    date: Date
}

interface postDTO {
    id: number,
    autorId: number,
    content: string,
    date: Date,
    likes: likeDTO[],
    comments: CommentDTO[]
}

interface postToTimelineDTO{
    id: number,
    autor: UserToPostDTO,
    content: string,
    date: Date,
    likes: likeDTO[],
    comments: CommentDTO[],
}

export { newPostDTO, postDTO, postToTimelineDTO }
