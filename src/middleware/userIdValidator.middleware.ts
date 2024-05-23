import { Request, Response, NextFunction } from 'express';
import UserService from '@/services/UserService';
import userMapper from '@/mappers/userMapper';

export async function userIdValidator(userId: number, req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!userId) res.status(400).json({ message: 'Invalid user id' });
        if (isNaN(userId)) res.status(400).json({ message: 'Invalid user id' });
        const user = userMapper.toDto(await UserService.getUserById(userId));
        (req as Request & { user: number }).user = user.id;
        next(); 
    } catch (error: unknown) {
        console.log((error as Error).message);
        res.status(404).json({ message: 'Invalid user' });
    }
}
