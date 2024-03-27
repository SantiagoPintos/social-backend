import { AppDataSource } from "./../orm/dataSource";
import { Post } from "./../entities/Post";

class PostService{
    async getUserPosts(userId: number, numberOfPosts?: number) : Promise<Post[]> {
        if(!userId){
            throw new Error('invalid user id');
        }
        if(numberOfPosts && numberOfPosts > 0){
            return await AppDataSource.getRepository(Post).find({ where: { autorId: userId }, take: numberOfPosts, order: { id: 'DESC' }});
        }
        return await AppDataSource.getRepository(Post).find({ where: { autorId: userId } });
    }
}

export default new PostService();