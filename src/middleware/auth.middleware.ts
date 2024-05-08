import { Request, Response, NextFunction } from 'express';
import AuthService from '@/services/AuthService';
import TokenService from '@/services/TokenService';
import { Tokens } from '@/entities/Tokens';
import NotAuthorizedError from '@/errors/Publication/NotAuthorizedError';

export async function authUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new NotAuthorizedError();
        }
        const payload = AuthService.verifyToken(token);
        if (!payload) {
            throw new NotAuthorizedError();
        }
        const userId = typeof payload === 'string' ? '' : payload.id;
        const userToken: Tokens | null = await TokenService.getToken(userId);
        if (token !== userToken?.token) {
            throw new NotAuthorizedError();
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
