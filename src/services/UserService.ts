import { AppDataSource } from "./../orm/dataSource";
import { User } from "./../entities/User";

export class UserService {

    async register(data: Partial<User>): Promise<User> {
        //check if the user already exists
        const email = data.email;
        const userExists = await AppDataSource.getRepository(User).findOne({ where: { email } });
        if (userExists) {
            throw new Error('User already exists');
        }

        const user = AppDataSource.getRepository(User).create(data);
        await AppDataSource.getRepository(User).save(user);
        return user;
    }

    async login(data: { username: string, password: string }): Promise<User> {
        const user = await AppDataSource.getRepository(User).findOne({ where: { username: data.username } });
        if (!user || user.password !== data.password) {
            throw new Error('User or password incorrect');
        }
        return user;
    }
}

