import { Request, Response, NextFunction } from 'express';
import UserService from '@/services/UserService';
import { User } from '@/entities/User';

export async function userIdValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = req.params.id;
        if (!userId) res.status(400).json({ message: 'Invalid user id' });
        if (isNaN(parseInt(userId))) res.status(400).json({ message: 'Invalid user id' });
        const user = await UserService.getUserById(parseInt(userId));
        //TODO: use userDTO instead of User
        (req as Request & { user: User }).user = user;
        next(); 
    } catch (error: unknown) {
        console.log((error as Error).message);
        res.status(404).json({ message: 'Invalid user' });
    }
}
