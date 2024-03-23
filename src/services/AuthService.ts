import { User } from '@/entities/User';
import jsonwebtoken, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

class AuthService {
    private key: Secret;

    constructor(){
        //TODO: fix this
        dotenv.config();
        this.key = process.env.JWT_SECRET || '';
    }

    generateToken(deviceId: string, user: User) :string{
        const combinedData ={
            id: user.id,
            username: user.username,
            email: user.email,
            deviceId: deviceId
        };
        try{
            return jsonwebtoken.sign(combinedData, this.key);
        }catch(error: any){
            console.log('Error generating token', error.message);
            throw new Error('Error generating token');
        }
    }

    verifyToken(token: string): any{
        return jsonwebtoken.verify(token, this.key);
    }
}

export default new AuthService();
