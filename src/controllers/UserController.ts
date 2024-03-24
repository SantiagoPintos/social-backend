import { Request, Response } from "express";
import { validateUserLogin, validateUserRegistration } from "./../validators/userValidator";
import { UserToRegisterDTO, UserToLoginDTO } from "./../dtos/user.dto";
import { User } from "./../entities/User";
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
        res.status(201).json({ message: 'Usuario registrado con éxito.', token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function loginUser (req: Request, res: Response): Promise<void>{
    try{
        const user: UserToLoginDTO = req.body;
        validateUserLogin(user);
        const logged = await UserService.login(user);
        const token = await TokenService.getToken(logged.id);
        res.status(200).json({ message: 'Usuario logueado con éxito.', token: token.token });
    } catch(error: any){
        res.status(400).json({ message: error.message });
    }
}