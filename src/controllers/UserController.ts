import { Request, Response } from "express";
import { validateUserLogin, validateUserRegistration } from "@/validators/userValidator";
import { UserDTO } from "@/dtos/user.dto";
import { User } from "@/entities/User";
import  UserService from "@/services/UserService";
import  AuthService  from "@/services/AuthService";
import UserError from "@/errors/User/UserError";

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const user: UserDTO = req.body;
        validateUserRegistration(user);
        const registeredUser: User = await UserService.register(user);
        const token = AuthService.generateToken(registeredUser);
        await AuthService.saveToken(registeredUser.id, token);
        res.status(201).json({ message: 'User successfully registered', token });
    } catch (error: unknown) {
        if((error as Error).message.includes('SQLITE')) ({ message: 'Something went wrong' });
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function loginUser (req: Request, res: Response): Promise<void>{
    try{
        const user: UserDTO = req.body;
        validateUserLogin(user);
        const loggedToken: string = await UserService.login(user);
        res.status(200).json({ message: 'User successfully logged in', token: loggedToken });
    } catch(error: unknown){
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export async function uploadProfileImage(req: Request, res: Response): Promise<void> {
    try{
        const user = (req as Request & { user: User }).user;
        const path = req.file?.path;
        if(!user) throw new UserError('Invalid user or image');
        if(!path) throw new UserError('Invalid file');
        await UserService.updateUserProfileImage(user.id, path);
        res.status(200).json({ message: 'Profile image updated successfully' });
    } catch (error: unknown){
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function deleteProfileImage(req: Request, res: Response): Promise<void> {
    try{
        const user = (req as Request & { user: User }).user;
        if(!user) throw new UserError('Invalid user');
        await UserService.deleteUserProfileImage(user.id);
        res.status(200).json({ message: 'Profile image deleted successfully' });
    } catch (error: unknown){
        res.status(500).json({ message: (error as Error).message });
    }
}