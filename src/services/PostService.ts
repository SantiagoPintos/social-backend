import { AppDataSource } from "./../orm/dataSource";
import { Post } from "./../entities/Post";
import { FindManyOptions } from "typeorm";

class PostService{
    async getUserPosts(userId: number, numberOfPosts: number|undefined) : Promise<Post[]> {
        if(!userId){
            throw new Error('invalid user id');
        }
        const options: FindManyOptions<Post> = { where: { autorId: userId } };
        if(numberOfPosts && numberOfPosts > 0){
            options.take = numberOfPosts;
            options.order = { id: 'DESC' };
        }
        return await AppDataSource.getRepository(Post).find(options);
    }
}

export default new PostService();