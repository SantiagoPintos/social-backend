import { Response, Request } from "express";
import AuthService from "./../services/AuthService";
import PostService from "./../services/PostService";
import TokenService from "./../services/TokenService";
import { Post } from "./../entities/Post";
import { Comment } from "./../entities/Comment";
import { Tokens } from "./../entities/Tokens";
import { JwtPayload } from "jsonwebtoken";
import { newPostDTO } from "./../dtos/post.dto";
import NotAuthorizedError from "./../errors/Publication/NotAuthorizedError";
import PostDataIncompleteError from "./../errors/Publication/PostDataIncompleteError";
import CommentDataIncompleteError from "./../errors/Publication/CommentDataIncompleteError";

export async function getUserPosts(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new NotAuthorizedError();
        }
        const payload: JwtPayload | string = AuthService.verifyToken(token);
        if (!payload) {
            throw new NotAuthorizedError();
        }
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await TokenService.getToken(userId);
        if (token !== userToken?.token){
            throw new NotAuthorizedError();
        }
        const numberOfPosts = parseInt(req.query.numberOfPosts as string) || undefined;
        const postId = parseInt(req.query.userid as string) || undefined;
        const posts: Post[] = await PostService.getUserPosts(userId, numberOfPosts, postId);
        res.status(200).json({ posts });
    } catch (error: unknown) {
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }    
}

export async function newUserPost(req: Request, res: Response): Promise<void>{
    try{
        const token = req.headers.authorization;
        if (!token) {
            throw new NotAuthorizedError();
        }
        const payload: JwtPayload | string = AuthService.verifyToken(token);
        if (!payload) {
            throw new NotAuthorizedError();
        } 
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await TokenService.getToken(userId);
        if (token !== userToken?.token){
            throw new NotAuthorizedError();
        }
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
        const token = req.headers.authorization;
        if (!token) {
            throw new NotAuthorizedError();
        }
        const payload: JwtPayload | string = AuthService.verifyToken(token);
        if (!payload) {
            throw new NotAuthorizedError();
        } 
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await TokenService.getToken(userId);
        if (token !== userToken?.token){
            throw new NotAuthorizedError();
        }
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