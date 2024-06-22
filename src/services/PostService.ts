import { AppDataSource } from "@/orm/dataSource";
import { Post } from "@/entities/Post";
import { Comment } from "@/entities/Comment";
import { FindManyOptions } from "typeorm";
import { newPostDTO, postToTimelineDTO } from "@/dtos/post.dto";
import PostError from "@/errors/Publication/PostError";
import CommentError from "@/errors/Publication/CommentError";
import idError from "@/errors/IdError";
import UserError from "@/errors/User/UserError";
import postMapper from "@/mappers/postMapper";
import { In } from "typeorm";

class PostService{
    async getUserPosts(userId: number, numberOfPosts: number|undefined, postId: number|undefined) : Promise<postToTimelineDTO[]> {
        if(!userId){
            throw new UserError('invalid user id');
        }
        const options: FindManyOptions<Post> = { 
            where: { autorId: userId },
            relations: ['comments', 'likes'] 
        };
        if(postId && postId > 0){
            options.where = { id: postId };
        }
        if(numberOfPosts && numberOfPosts > 0){
            options.take = numberOfPosts;
            options.order = { id: 'DESC' };
        }

        const posts = await AppDataSource.getRepository(Post).find(options);
        if(!posts || posts.length === 0) throw new PostError('No posts found');

        const postDTOs = await Promise.all(posts.map(async post => await postMapper.toTimelineDTO(post)));

        return postDTOs;
    }

    async newUserPost(userId: number, postData: newPostDTO): Promise<postToTimelineDTO> {
        if(!userId){
            throw new Error('invalid user id');
        }
        const post = new Post();
        post.autorId = userId;
        post.content = postData.content;
        post.date = postData.date;
        post.likes = [];
        return await postMapper.toTimelineDTO(await AppDataSource.getRepository(Post).save(post));
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
        newComment.parentPost = post;
        newComment.likes = [];

        return await commentRepository.save(newComment);
    }

    async getPostById(postId: number): Promise<Post> {
        if(!postId){
            throw new idError('invalid post id');
        }
        const post = await AppDataSource.getRepository(Post).findOne({
            where: { id: postId },
            relations: ['likes', 'likes.user']
        });
        if(!post){
            throw new PostError('Post not found');
        }
        return post;
    }

    async getCommentById(commentId: number): Promise<Comment> {
        if(!commentId){
            throw new idError('invalid comment id');
        }
        const comment = await AppDataSource.getRepository(Comment).findOne({
            where: { id: commentId },
            relations: ['likes', 'likes.user']
        });
        if(!comment){
            throw new CommentError('Comment not found');
        }
        
        return comment;
    }

    async getUserTimeLine(userId: number, followedIds: number[]): Promise<postToTimelineDTO[]> {
        if(!userId || userId < 0) throw new UserError('Invalid user id');
        if(!followedIds || followedIds.length === 0) throw new UserError('No followers found');
        const postRepo = AppDataSource.getRepository(Post);
        if(!postRepo) throw new PostError('Repository not found');
        followedIds.push(userId);
        const posts = await postRepo.find({
            where: { autorId: In(followedIds)},
            order: { date: 'DESC'},
            relations: ['comments', 'likes']
        });
        return await Promise.all(posts.map(async post => await postMapper.toTimelineDTO(post)));
    }
}

export default new PostService();