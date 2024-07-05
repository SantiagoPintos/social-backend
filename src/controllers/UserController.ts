import { Request, Response } from "express";
import { validateUserLogin, validateUserRegistration } from "@/validators/userValidator";
import { UserDTO } from "@/dtos/user.dto";
import  UserService from "@/services/UserService";
import UserError from "@/errors/User/UserError";

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const user: UserDTO = req.body;
        validateUserRegistration(user);
        const token = await UserService.register(user);
        res.status(201).json({ message: 'User successfully registered', token });
    } catch (error: unknown) {
        if((error as Error).name == 'UserDataIncompleteError') {
            res.status(400).json({ message: (error as Error).message });
        } else if((error as Error).name == 'UserError') {
            res.status(400).json({ message: (error as Error).message });
        } else {
        res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

export async function loginUser (req: Request, res: Response): Promise<void>{
    try{
        const user: UserDTO = req.body;
        validateUserLogin(user);
        const loggedToken: string = await UserService.login(user);
        res.status(200).json({ message: 'User successfully logged in', token: loggedToken });
    } catch(error: unknown){
        console.log(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export async function uploadProfileImage(req: Request, res: Response): Promise<void> {
    try{
        const user = (req as Request & { user: number }).user;
        const path = req.file?.path;
        if(!user) throw new UserError('Invalid user or image');
        if(!path) throw new UserError('Invalid file');
        await UserService.updateUserProfileImage(user, path);
        res.status(201).json({ message: 'Profile image updated successfully' });
    } catch (error: unknown){
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function deleteProfileImage(req: Request, res: Response): Promise<void> {
    try{
        const user = (req as Request & { user: number }).user;
        if(!user) throw new UserError('Invalid user');
        await UserService.deleteUserProfileImage(user);
        res.status(200).json({ message: 'Profile image deleted successfully' });
    } catch (error: unknown){
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function followUser(req: Request, res: Response): Promise<void> {
    try{
        const user = (req as Request & { user: number }).user;
        const followedId = parseInt(req.params.id);
        if(!user || !followedId) throw new UserError('Invalid user');
        const message = await UserService.followUser(user, followedId);
        res.status(201).json({ message: message });
    } catch (error: unknown){
        if((error as Error).name == 'UserError'){
            res.status(400).json({ message: (error as Error).message });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}