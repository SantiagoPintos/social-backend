import { Like } from "@/entities/Like";
import { AppDataSource } from "@/orm/dataSource";
import PostService from "./PostService";
import UserService from "./UserService";
import { User } from "@/entities/User";
import { Post } from "@/entities/Post";
import { Comment } from "@/entities/Comment";
import likeMapper from "@/mappers/likeMapper";
import { likeDTO } from "@/dtos/like.dto";


class LikeService{
    async likePublication(userId: number, postId: number, type: string): Promise<likeDTO> {
        if(!userId || !postId || (type !== 'post' && type !== 'comment')){
            throw new Error('invalid ids');
        }
        const user: User = await UserService.getUserById(userId);
        let publication: Post|Comment;
        if(type == 'post'){
            publication = await PostService.getPostById(postId);
        } else {
            publication = await PostService.getCommentById(postId);
        }

        if(!publication || !user){
            throw new Error('Invalid post or user id');
        }

        const like = new Like();
        like.date = new Date();
        like.user = user;
        if(publication instanceof Post){
            like.post = publication;
        } else {
            like.comment = publication;
        }
        if(publication.likes.find((l) => l.user && l.user.id == userId)){
            await AppDataSource.getRepository(Like).remove(like);
        } else {
            await AppDataSource.getRepository(Like).save(like);
        }

        return likeMapper.toDTO(like);
    }
} 

export default new LikeService();
