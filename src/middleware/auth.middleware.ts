import { Request, Response, NextFunction } from 'express';
import AuthService from '@/services/AuthService';
import NotAuthorizedError from '@/errors/Publication/NotAuthorizedError';

export async function authUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.authorization;
        if (!token) throw new NotAuthorizedError("Unauthorized");
        let payload;
        try{
            payload = AuthService.verifyToken(token);
        } catch (error: unknown) {
            throw new NotAuthorizedError("Unauthorized");
        }
        if (!payload || typeof payload !== 'object' || !payload.id) throw new NotAuthorizedError("Unauthorized");
        const userId = payload.id;
        next(userId);
    } catch (error) {
        if ((error as Error).name == 'NotAuthorizedError') {
            res.status(401).json({ message: (error as Error).message});
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
