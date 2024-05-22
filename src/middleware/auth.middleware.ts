import { Request, Response, NextFunction } from 'express';
import AuthService from '@/services/AuthService';
import { Tokens } from '@/entities/Tokens';
import NotAuthorizedError from '@/errors/Publication/NotAuthorizedError';

export async function authUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new NotAuthorizedError("No token provided");
        }
        const payload = AuthService.verifyToken(token);
        if (!payload) {
            throw new NotAuthorizedError("Invalid token");
        }
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await AuthService.getToken(userId);
        if (token !== userToken?.token) {
            throw new NotAuthorizedError("Invalid token");
        }
        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message });
    }
}
