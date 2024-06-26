import { Post } from "@/entities/Post";
import { postDTO, postToTimelineDTO } from "@/dtos/post.dto";
import { likeDTO } from "@/dtos/like.dto";
import { CommentDTO } from "@/dtos/comment.dto";
import UserService from "@/services/UserService";
import { UserToPostDTO } from "@/dtos/user.dto";
import userMapper from "./userMapper";

export class postMapper{
    async toDto(post: Post): Promise<postDTO>{
        const autorDTO: UserToPostDTO =  userMapper.toTimelineDTO(await UserService.getUserById(post.autorId));

        const dto: postDTO = {
            id: post.id,
            autorId: post.autorId,
            content: post.content,
            date: post.date,
            likes: post.likes.map((l) => {
                const like: likeDTO = {
                    userId: l.user.id,
                    publicationId: l.post ? l.post.id : l.comment.id,
                    date: l.date
                }
                return like;
            }),
            comments: await Promise.all(post.comments?.map(async (c) => {
                const comment: CommentDTO = {
                    id: c.id,
                    content: c.content,
                    date: c.date,
                    autorId: autorDTO,
                    parentPostId: c.parentPost.id,
                    likes: c.likes.map((l) => {
                        const like: likeDTO = {
                            userId: l.user.id,
                            publicationId: l.post ? l.post.id : l.comment.id,
                            date: l.date
                        }
                        return like;
                    })
                }
                return comment;
            }) ?? [])
        }

        return dto;
    }

    async toTimelineDTO(post: Post): Promise<postToTimelineDTO>{
        const autorDTO:UserToPostDTO = userMapper.toTimelineDTO(await UserService.getUserById(post.autorId));

        const dto: postToTimelineDTO = {
            id: post.id,
            autor: autorDTO,
            content: post.content,
            date: post.date,
            likes: post.likes?.map((l) => {
                const like: likeDTO = {
                    userId: l.user.id,
                    publicationId: l.post ? l.post.id : l.comment.id,
                    date: l.date
                }
                return like;
            }),
            comments: post.comments?.map((c) => {
                const comment: CommentDTO = {
                    id: c.id,
                    content: c.content,
                    date: c.date,
                    autorId: autorDTO,
                    parentPostId: c.parentPost.id,
                    likes: c.likes?.map((l) => {
                        const like: likeDTO = {
                            userId: l.user.id,
                            publicationId: l.post ? l.post.id : l.comment.id,
                            date: l.date
                        }
                        return like;
                    })
                }
                return comment;
            }) ?? [] 
        }

        return dto;
    }
}

export default new postMapper();