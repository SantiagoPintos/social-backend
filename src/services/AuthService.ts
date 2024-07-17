import { User } from '@/entities/User';
import jsonwebtoken, { JwtPayload, Secret } from 'jsonwebtoken';
import crypto from 'crypto';

class AuthService {
    private key: Secret;

    constructor(){
        this.key = process.env.JWT_SECRET || '';
    }

    generateToken(user: User) :string{
        const date = new Date();
        const sessionId = crypto.randomBytes(7).toString('hex');
        const combinedData ={
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
