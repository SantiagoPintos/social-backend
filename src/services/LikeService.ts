import { Like } from "@/entities/Like";
import { AppDataSource } from "@/orm/dataSource";
import PostService from "./PostService";
import UserService from "./UserService";
import { User } from "@/entities/User";
import { Post } from "@/entities/Post";


class LikeService{
    async likePost(userId: number, postId: number): Promise<Like> {
        if(!userId || !postId){
            throw new Error('invalid ids');
        }
        const user: User = await UserService.getUserById(userId);
        const postList: Post[] = await PostService.getUserPosts(userId, 1, postId);
        if(!postList || postList.length == 0 || !user){
            throw new Error('Invalid post or user id');
        }
        const post: Post = postList[0];
        const like = new Like();
        like.date = new Date();
        like.user = user;
        like.post = post;

        if(post.likes.find((l) => l.user.id == userId)){
            await AppDataSource.getRepository(Like).remove(like);
        } else {
            await AppDataSource.getRepository(Like).save(like);
        }

        return like;
    }
}

export default new LikeService();
