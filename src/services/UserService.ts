import { AppDataSource } from "@/orm/dataSource";
import { User } from "@/entities/User";
import PasswordService from "./PasswordService";

class UserService {

    async register(data: Partial<User>): Promise<User> {
        //check if the user already exists
        const email = data.email;
        const userExists = await AppDataSource.getRepository(User).findOne({ where: { email } });
        if (userExists) {
            throw new Error('User already exists');
        }
        if (data.password) {
            data.password = await PasswordService.hashPassword(data.password);
        }
        const user = AppDataSource.getRepository(User).create(data);
        await AppDataSource.getRepository(User).save(user);
        return user;
    }

    async login(data: { username: string, password: string }): Promise<User> {
        const user = await AppDataSource.getRepository(User).findOne({ where: { username: data.username } });
        //we throw the same error twice to avoid comparing the password with a non-existent user	
        if (!user) {
            throw new Error('User or password incorrect');
        }
        const passwordMatch = await PasswordService.comparePassword(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('User or password incorrect');
        }
        return user;
    }
}

export default new UserService();
