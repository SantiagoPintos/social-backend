import { Response, Request } from "express";
import PostService from "@/services/PostService";
import { newPostDTO, postToTimelineDTO } from "@/dtos/post.dto";
import { CommentDTO } from "@/dtos/comment.dto";
import PostDataIncompleteError from "@/errors/Publication/PostDataIncompleteError";
import CommentDataIncompleteError from "@/errors/Publication/CommentDataIncompleteError";

export async function getUserPosts(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as Request & { user: number }).user;
        const numberOfPosts = parseInt(req.body.numberOfPosts as string) || undefined;
        const postId = parseInt(req.body.postId as string) || undefined;
        const posts: postToTimelineDTO[] = await PostService.getUserPosts(userId, numberOfPosts, postId);
        res.status(200).json({ posts });
    } catch (error: unknown) {
        console.log((error as Error).message);
        if((error as Error).name == 'UserError') res.status(400).json({ message: 'Something went wrong' });
        if((error as Error).name == 'PostError') res.status(204).json({ message: (error as Error).message });
        res.status(500).json({ message: 'Something went wrong' });
    }    
}

export async function newUserPost(req: Request, res: Response): Promise<void>{
    try{
        const userId = (req as Request & { user: number }).user;
        const post: newPostDTO = {
            content: req.body.content,
            date: new Date(),
            autorId: userId
        };
        if (!post.content || !post.date){
            throw new PostDataIncompleteError();
        }
        const newPost: postToTimelineDTO = await PostService.newUserPost(userId, post);
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch(error: unknown){
        console.log((error as Error).message);
        if((error as Error).name == 'UserError') res.status(400).json({ message: (error as Error).message });
        else res.status(500).json({ message: 'Something went wrong' });
    }
}

export async function newComment(req: Request, res: Response): Promise<void>{
    try{
        const userId = (req as Request & { user: number }).user;
        const comment = req.body.comment;
        const postId = parseInt(req.params.postId);
        if (!comment || !postId){
            throw new CommentDataIncompleteError();
        }
        const newComment: CommentDTO = await PostService.newUserPostComment(userId, postId, comment);
        res.status(201).json({ message: 'Comment created successfully', post: newComment });
    } catch(error: unknown){
        console.log((error as Error).message);
        if((error as Error).name == 'UserError') res.status(400).json({ message: (error as Error).message });
        if((error as Error).name == 'PostError') res.status(400).json({ message: (error as Error).message });
        if((error as Error).name == 'CommentError') res.status(400).json({ message: (error as Error).message });
        res.status(500).json({ message: 'Something went wrong' });
    }
}
