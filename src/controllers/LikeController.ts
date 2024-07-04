import { Request, Response } from 'express';
import LikeService from '@/services/LikeService';
import idError from '@/errors/IdError';

export async function likePost(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.body.userId as string);
        const { postId, type } = req.params;  
        if (!userId || !postId || (type !== 'post' && type !== 'comment')) {
            throw new idError('invalid ids');
        }
        const result = await LikeService.likePublication(userId, parseInt(postId), type);
        if (result.like) {
            res.status(201).json({ message: result.message, like: result.like });
        } else {
            res.status(200).json({ message: result.message });
        }
    } catch (error: unknown) {
        if ((error as Error).name === 'PostError' || (error as Error).name === 'CommentError') {
            res.status(404).json({ message: (error as Error).message });
        } else if ((error as Error).name === 'idError') {
            res.status(400).json({ message: (error as Error).message });
        } else {
            console.log((error as Error).message);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

