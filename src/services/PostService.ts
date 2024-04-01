import { AppDataSource } from "./../orm/dataSource";
import { Post } from "./../entities/Post";
import { Comment } from "./../entities/Comment";
import { FindManyOptions } from "typeorm";
import { newPostDTO } from "./../dtos/post.dto";

class PostService{
    async getUserPosts(userId: number, numberOfPosts: number|undefined, postId: number|undefined) : Promise<Post[]> {
        if(!userId){
            throw new Error('invalid user id');
        }
        const options: FindManyOptions<Post> = { 
            where: { autorId: userId },
            relations: ['comments'] 
        };
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

    async newUserPostComment(userId: number, postId: number|undefined, comment: string): Promise<Comment> {
        if(!userId){
            throw new Error('invalid user id');
        }
        if(!postId){
            throw new Error('invalid post id');
        }
        if(!comment || comment.length < 3){
            throw new Error('invalid comment');
        }
        const postRepository = AppDataSource.getRepository(Post);
        const post = await postRepository.findOne({ where: { id: postId } });
        if(!post){
            throw new Error('invalid post id');
        }
        const commentRepository = AppDataSource.getRepository(Comment);
        const newComment = new Comment();
        newComment.autorId = userId;
        newComment.content = comment;
        newComment.date = new Date();
        newComment.likes = 0;
        newComment.parentPost = post;

        return await commentRepository.save(newComment);
    }

    async getUserPostsComment(postId: number|undefined): Promise<Comment[]> {
        if(!postId){
            throw new Error('invalid post id');
        }
        return await AppDataSource.getRepository(Comment).find({ where: { parentPost: { id: postId } } });
    }
}

export default new PostService();