import { Request, Response } from "express";
import { validateUserLogin, validateUserRegistration } from "./../validators/userValidator";
import { UserToRegisterDTO, UserToLoginDTO } from "./../dtos/user.dto";
import { User } from "./../entities/User";
import { Tokens } from "./../entities/Tokens";
import  UserService from "./../services/UserService";
import  AuthService  from "./../services/AuthService";
import  TokenService  from "./../services/TokenService";

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const user: UserToRegisterDTO = req.body;
        validateUserRegistration(user);
        const registeredUser: User = await UserService.register(user);
        const token = AuthService.generateToken(req.body.deviceId, registeredUser);
        await TokenService.saveToken(registeredUser.id, token);
        res.status(201).json({ message: 'User successfully registered', token });
    } catch (error: unknown) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function loginUser (req: Request, res: Response): Promise<void>{
    try{
        const user: UserToLoginDTO = req.body;
        validateUserLogin(user);
        const logged: User = await UserService.login(user);
        const token: Tokens|null = await TokenService.getToken(logged.id);
        if(token) await TokenService.revokeToken(token);
        const newToken: string = AuthService.generateToken(req.body.deviceId, logged);
        await TokenService.saveToken(logged.id, newToken);
        res.status(200).json({ message: 'User successfully logged in', token: newToken });
    } catch(error: unknown){
        res.status(400).json({ message: 'Something went wrong' });
    }
}