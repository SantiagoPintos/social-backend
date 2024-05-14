import { likeDTO } from "./like.dto"


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
    likes: likeDTO[]
}

export { newPostDTO, postDTO }
