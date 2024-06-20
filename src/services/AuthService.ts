import { User } from '@/entities/User';
import jsonwebtoken, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

class AuthService {
    private key: Secret;

    constructor(){
        //TODO: fix this
        dotenv.config();
        this.key = process.env.JWT_SECRET || '';
    }

    generateToken(user: User) :string{
        const date = new Date();
        const sessionId = Math.random().toString(36).substring(7);
        const combinedData ={
            id: user.id,
            username: user.username,
            email: user.email,
            date: date,
            sessionId: sessionId
        };
        try{
            return jsonwebtoken.sign(combinedData, this.key, {expiresIn: '1h'});
        } catch (error: unknown) {
            console.log('Error generating token', (error as Error).message);
            throw new Error('Error generating token');
        }
    }

    verifyToken(token: string): string | JwtPayload{
        try {
            return jsonwebtoken.verify(token, this.key);
        } catch (error: unknown) {
            console.log('Error verifying token', (error as Error).message);
            throw new Error('Error verifying token');
        }
    }
}

export default new AuthService();
