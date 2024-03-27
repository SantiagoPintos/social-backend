import { Response, Request } from "express";
import AuthService from "./../services/AuthService";
import PostService from "./../services/PostService";
import { Post } from "./../entities/Post";
import { JwtPayload } from "jsonwebtoken";

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
        const posts: Post[] = await PostService.getUserPosts(userId);
        res.status(200).json(posts);
    } catch (error: unknown) {
        res.status(401).json({ message: (error as Error).message });
    }
    
    return undefined;
}
