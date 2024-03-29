import { Response, Request } from "express";
import AuthService from "./../services/AuthService";
import PostService from "./../services/PostService";
import TokenService from "./../services/TokenService";
import { Post } from "./../entities/Post";
import { JwtPayload } from "jsonwebtoken";
import { Tokens } from "./../entities/Tokens";
import { newPostDTO } from "./../dtos/post.dto";

export async function getUserPosts(req: Request, res: Response): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('You are not authorized to access this resource');
        }
        const payload: JwtPayload | string = AuthService.verifyToken(token);
        if (!payload) {
            throw new Error('You are not authorized to access this resource');
        }
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await TokenService.getToken(userId);
        if (token !== userToken?.token){
            throw new Error('You are not authorized to access this resource');
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
            throw new Error('You are not authorized to access this resource');
        }
        const payload: JwtPayload | string = AuthService.verifyToken(token);
        if (!payload) {
            throw new Error('You are not authorized to access this resource');
        } 
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await TokenService.getToken(userId);
        if (token !== userToken?.token){
            throw new Error('You are not authorized to access this resource');
        }
        const post: newPostDTO = {
            content: req.body.content,
            date: new Date(),
            autorId: userId
        };
        if (!post.content || !post.date){
            throw new Error('Post data is incomplete');
        }
        const newPost: Post = await PostService.newUserPost(userId, post);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch(error: unknown){
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }
}
