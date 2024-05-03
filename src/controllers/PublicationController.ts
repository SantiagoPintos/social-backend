import { Response, Request } from "express";
import PostService from "./../services/PostService";
import { Post } from "./../entities/Post";
import { Comment } from "./../entities/Comment";
import { newPostDTO } from "./../dtos/post.dto";
import PostDataIncompleteError from "./../errors/Publication/PostDataIncompleteError";
import CommentDataIncompleteError from "./../errors/Publication/CommentDataIncompleteError";

export async function getUserPosts(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.query.userId as string);
        const numberOfPosts = parseInt(req.query.numberOfPosts as string) || undefined;
        const postId = parseInt(req.query.postId as string) || undefined;
        const posts: Post[] = await PostService.getUserPosts(userId, numberOfPosts, postId);
        res.status(200).json({ posts });
    } catch (error: unknown) {
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }    
}

export async function newUserPost(req: Request, res: Response): Promise<void>{
    try{
        const userId = parseInt(req.body.userId as string);
        const post: newPostDTO = {
            content: req.body.content,
            date: new Date(),
            autorId: userId
        };
        if (!post.content || !post.date){
            throw new PostDataIncompleteError();
        }
        const newPost: Post = await PostService.newUserPost(userId, post);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch(error: unknown){
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }
}

export async function newUserPostComment(req: Request, res: Response): Promise<void>{
    try{
        const userId = parseInt(req.body.userId as string);
        const comment = req.body.comment;
        const parentPostId = req.body.parentPostId;
        if (!comment || !parentPostId){
            throw new CommentDataIncompleteError();
        }
        const newComment: Comment = await PostService.newUserPostComment(userId, parentPostId, comment);
        res.status(201).json({ message: 'Comment created successfully', post: newComment });
    } catch(error: unknown){
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }
}

export async function getUserPostsComment(req: Request, res: Response): Promise<void>{
    try{
        const postId = parseInt(req.body.postId as string);
        const comments: Comment[] = await PostService.getUserPostsComment(postId);
        res.status(200).json({ comments });
    } catch(error: unknown){
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }
}