import { Request, Response, NextFunction } from 'express';
import AuthService from '@/services/AuthService';
import NotAuthorizedError from '@/errors/Publication/NotAuthorizedError';

export async function authUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new NotAuthorizedError("Unauthorized");
        }
        const payload = AuthService.verifyToken(token);
        const userId = typeof payload === 'string' ? '' : payload.id;
        next(userId);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
