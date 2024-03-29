import { AppDataSource } from "./../orm/dataSource";
import { Post } from "./../entities/Post";
import { FindManyOptions } from "typeorm";
import { newPostDTO } from "./../dtos/post.dto";

class PostService{
    async getUserPosts(userId: number, numberOfPosts: number|undefined, postId: number|undefined) : Promise<Post[]> {
        if(!userId){
            throw new Error('invalid user id');
        }
        const options: FindManyOptions<Post> = { where: { autorId: userId } };
        if(postId && postId > 0){
            options.where = { id: postId };
        }
        if(numberOfPosts && numberOfPosts > 0){
            options.take = numberOfPosts;
            options.order = { id: 'DESC' };
        }
        return await AppDataSource.getRepository(Post).find(options);
    }

    async newUserPost(userId: number, postData: newPostDTO): Promise<Post> {
        if(!userId){
            throw new Error('invalid user id');
        }
        const post = new Post();
        post.autorId = userId;
        post.content = postData.content;
        post.date = postData.date;
        post.likes = 0;
        return await AppDataSource.getRepository(Post).save(post);
    }
}

export default new PostService();