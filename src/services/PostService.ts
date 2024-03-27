import { AppDataSource } from "./../orm/dataSource";
import { Post } from "./../entities/Post";

class PostService{
    async getUserPosts(userId: number) : Promise<Post[]> {
        if(!userId){
            throw new Error('invalid user id');
        }
        return await AppDataSource.getRepository(Post).find({ where: { autorId: userId } });
    }
}

export default new PostService();