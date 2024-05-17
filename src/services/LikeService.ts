import { Like } from "@/entities/Like";
import { AppDataSource } from "@/orm/dataSource";
import PostService from "./PostService";
import UserService from "./UserService";
import { User } from "@/entities/User";
import { Post } from "@/entities/Post";
import { Comment } from "@/entities/Comment";
import likeMapper from "@/mappers/likeMapper";
import { likeDTO } from "@/dtos/like.dto";
import idError from "@/errors/IdError";


class LikeService{
    async likePublication(userId: number, postId: number, type: string): Promise<{ like?: likeDTO, message: string }> {
        try{
            if(!userId || !postId || (type !== 'post' && type !== 'comment')){
                throw new idError('invalid post or user');
            }
            const user: User = await UserService.getUserById(userId);
            let publication: Post|Comment;
            
            if(type == 'post'){
                publication = await PostService.getPostById(postId);
            } else {
                publication = await PostService.getCommentById(postId);
            }
            
            const existingLike = await AppDataSource.getRepository(Like).findOne({
                where: {
                    user: { id: userId },
                    post: type === 'post' ? { id: postId } : undefined,
                    comment: type === 'comment' ? { id: postId } : undefined,
                },
                relations: ['post', 'comment', 'user']
            });
            
            let like: Like;
            let message: string;
            if (existingLike) {
                await AppDataSource.getRepository(Like).remove(existingLike);
                like=existingLike;
                return {message: 'Like removed'};
            } else {
                like = new Like();
                like.date = new Date();
                like.user = user;
                if (publication instanceof Post) {
                    like.post = publication;
                } else {
                    like.comment = publication;
                }
                like = await AppDataSource.getRepository(Like).save(like);
                message = 'Like created successfully';
            }
            return { like: likeMapper.toDTO(like), message };
        } catch (error: unknown) {  
            console.log((error as Error).message);
            throw error;
        }
    }
} 

export default new LikeService();
