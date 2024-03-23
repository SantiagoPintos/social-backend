import { AppDataSource } from "./../orm/dataSource";
import { Tokens } from "./../entities/Tokens";

class TokenService {
    async saveToken(userId: number, token: string): Promise<void> {
        const tokenData = await AppDataSource.getRepository(Tokens).findOne({ where: { userId } });
        if (tokenData) {
            throw new Error('Token already exists');
        }
        await AppDataSource.getRepository(Tokens).save({ userId, token, generated: new Date() });
    }

    async getToken(token: Tokens): Promise<Tokens> {
        const userId = token.userId;
        const tokenData = await AppDataSource.getRepository(Tokens).findOne({ where: { userId } });
        if (!tokenData) {
            throw new Error('Token not found');
        }
        return tokenData;
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

export default new TokenService();