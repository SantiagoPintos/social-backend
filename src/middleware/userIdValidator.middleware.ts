import { Request, Response, NextFunction } from 'express';
import UserService from '@/services/UserService';
import userMapper from '@/mappers/userMapper';
import { UserDTO } from '@/dtos/user.dto';

export async function userIdValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = req.params.id;
        if (!userId) res.status(400).json({ message: 'Invalid user id' });
        if (isNaN(parseInt(userId))) res.status(400).json({ message: 'Invalid user id' });
        const user = userMapper.toDto(await UserService.getUserById(parseInt(userId)));
        (req as Request & { user: UserDTO }).user = user;
        next(); 
    } catch (error: unknown) {
        console.log((error as Error).message);
        res.status(404).json({ message: 'Invalid user' });
    }
}
