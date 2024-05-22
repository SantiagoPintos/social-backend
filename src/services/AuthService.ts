import { User } from '@/entities/User';
import { Tokens } from "@/entities/Tokens";
import { AppDataSource } from "@/orm/dataSource";
import jsonwebtoken, { JwtPayload, Secret } from 'jsonwebtoken';
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
        } catch (error: unknown) {
            console.log('Error generating token', (error as Error).message);
            throw new Error('Error generating token');
        }
    }

    verifyToken(token: string): string | JwtPayload{
        return jsonwebtoken.verify(token, this.key);
    }

    async saveToken(userId: number, token: string): Promise<void> {
        const tokenData = await AppDataSource.getRepository(Tokens).findOne({ where: { userId } });
        if (tokenData) {
            throw new Error('Token already exists');
        }
        await AppDataSource.getRepository(Tokens).save({ userId, token, generated: new Date() });
    }

    async getToken(userId: number): Promise<Tokens|null> {
        return await AppDataSource.getRepository(Tokens).findOne({ where: { userId } }) || null;
    }

    async revokeToken(token: Tokens): Promise<void> {
        const userId = token.userId;
        const tokenData = await AppDataSource.getRepository(Tokens).findOne({ where: { userId } });
        if (!tokenData) {
            throw new Error('Token not found');
        }
        try {
            await AppDataSource.getRepository(Tokens).remove(tokenData);
        } catch (error) {
            throw new Error('Error revoking token');
        }
    }
}

export default new AuthService();
