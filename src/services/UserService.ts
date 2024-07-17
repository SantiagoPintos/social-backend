import { User } from "@/entities/User";
import PasswordService from "./PasswordService";
import UserError from "@/errors/User/UserError";
import fs from 'fs';
import AuthService from "./AuthService";
import { UserDTO } from "@/dtos/user.dto";
import { UserFollower } from "@/entities/UserFollower";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {

    async register(data: UserDTO): Promise<string> {
        const email = data.email;
        const username = data.username;
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });
        if (userExists) {
            throw new UserError('User already exists');
        }
        if (!data.password) {
            throw new UserError('Password is required');
        }
        data.password = await PasswordService.hashPassword(data.password);
        const newUser = new User(data.name, data.lastName, data.username, data.email, data.password, data.profileImage);
        await prisma.user.create({ 
            data: {
                ...newUser,
                likes: {
                    create: []
                },
                followers: {
                    create: []
                },
                following: undefined
            }
        });
        const token = AuthService.generateToken(newUser);

        return token;
    }

    async login(data: { username: string, password: string }): Promise<string> {
        if (!data.username || !data.password) {
            throw new UserError('User and password are required');
        }
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                username: data.username
            }
        });
        const passwordMatch = await PasswordService.comparePassword(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('User or password incorrect');
        }
        const castedUser = user as unknown as User;
        const token = AuthService.generateToken(castedUser);
        
        return token;
    }

    async getUserById(id: number): Promise<User> {
        const user = await prisma.user.findUniqueOrThrow({ where: { id }, include: { followers: true, following: true, likes: { include: { user: true, post: true, comment: true } } } });
    
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
