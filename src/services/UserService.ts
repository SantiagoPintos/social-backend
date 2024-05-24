import { AppDataSource } from "@/orm/dataSource";
import { User } from "@/entities/User";
import PasswordService from "./PasswordService";
import UserError from "@/errors/User/UserError";
import fs from 'fs';
import AuthService from "./AuthService";
import { UserDTO } from "@/dtos/user.dto";
import { UserFollower } from "@/entities/UserFollower";

class UserService {

    async register(data: Partial<UserDTO>): Promise<string> {
        //check if the user already exists
        const email = data.email;
        const username = data.username;
        const userExists = await AppDataSource.getRepository(User).findOne({ where: [{ email }, { username }]});
        if (userExists) {
            throw new UserError('User already exists');
        }
        if (!data.password) {
            throw new UserError('Password is required');
        }
        data.password = await PasswordService.hashPassword(data.password);
        const user = AppDataSource.getRepository(User).create(data);
        await AppDataSource.getRepository(User).save(user);

        const token = AuthService.generateToken(user);
        await AuthService.saveToken(user.id, token);

        return token;
    }

    async login(data: { username: string, password: string }): Promise<string> {
        const user = await AppDataSource.getRepository(User).findOne({ where: { username: data.username } });
        //we throw the same error twice to avoid comparing the password with a non-existent user	
        if (!user) {
            throw new Error('User or password incorrect');
        }
        const passwordMatch = await PasswordService.comparePassword(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('User or password incorrect');
        }
        const userToken = await AuthService.getToken(user.id);
        if (userToken) {
            await AuthService.revokeToken(userToken);
        }
        const newToken = AuthService.generateToken(user);
        await AuthService.saveToken(user.id, newToken);
        
        return newToken;
    }

    async getUserById(id: number): Promise<User> {
        const user = await AppDataSource.getRepository(User).findOne({ where: { id } });
        if (!user) {
            throw new UserError('User not found');
        }
        return user;
    }

    async updateUserProfileImage(id: number, path: string): Promise<void> {
        try {
            if(id<=0) throw new UserError('Invalid user id');
            if(path.length<=6) throw new UserError('Invalid image path');
            const user = await this.getUserById(id);
            if(user.profileImage.length > 6) await this.deleteUserProfileImage(id);
            await AppDataSource.getRepository(User).update(id, { profileImage: path });
        } catch (error: unknown) {
            throw new UserError('User not found');
        }
    }

    async deleteUserProfileImage(id: number): Promise<void> {
        try {
            if(id<=0) throw new UserError('Invalid user id');
            const user = await this.getUserById(id);
            if (!user) {
                throw new UserError('User not found');
            }
            try {
                if(user.profileImage.length > 6) fs.unlinkSync(user.profileImage);
            } catch (error: unknown) {
                console.log('Image file not found');
            }
            try {
                await AppDataSource.getRepository(User).update(id, { profileImage: '' });
            } catch (error: unknown) {
                console.log('Error updating user profile image');
            }
        } catch (error: unknown) {
            console.log('error', error);
            throw new UserError('User not found');
        }
    }

    async followUser(followerId: number, followedId: number): Promise<string> {
        try {
            enum returnMessage {
                follow = 'User followed',
                unfollow = 'User unfollowed'
            }
            
            if(followerId<=0 || followedId<=0) throw new UserError('Invalid user id');
            const follower = await this.getUserById(followerId);
            const followed = await this.getUserById(followedId);
            if(follower.id === followed.id) throw new UserError('You cannot follow yourself');
            const userFollower = await AppDataSource.getRepository(UserFollower).findOne({ where: { follower, followed } });
            if (userFollower) {
                await AppDataSource.getRepository(UserFollower).delete({ follower, followed });
                return returnMessage.unfollow; 
            }
            AppDataSource.getRepository(UserFollower).create({ follower, followed });
            await AppDataSource.getRepository(UserFollower).save({ follower, followed });
            return returnMessage.follow;

        } catch (error: unknown) {
            console.log((error as Error).message);
            throw error;
        }
    }

    async getListOfFolloweds(id: number): Promise<User[]> {
        try {
            if(!id || id<=0) throw new UserError('Invalid user id');
            const user = await this.getUserById(id);
            const followeds = await AppDataSource.getRepository(UserFollower).find({
                where: { follower: user },
                relations: ["followed"]
            });

            return followeds.map(followed => followed.followed);
        } catch (error: unknown) {
            console.log((error as Error).message);
            throw error;
        }
    }
}

export default new UserService();
