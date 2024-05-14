import { Request, Response } from 'express';
import LikeService from '@/services/LikeService';
import { likeDTO } from '@/dtos/like.dto';

export async function likePost(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.body.userId as string);
        const { postId, type } = req.params;  
        if (!userId || !postId || (type !== 'post' && type !== 'comment')) {
            throw new Error('invalid ids');
        }
        const like: likeDTO = await LikeService.likePublication(userId, parseInt(postId), type);
        res.status(200).json({ message: 'Like created successfully', like });
    } catch (error: unknown) {
        console.log((error as Error).message);
        res.status(401).json({ message: 'Something went wrong' });
    }
}

