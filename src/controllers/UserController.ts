import { Request, Response } from "express";
import { UserService } from "./../services/UserService";
import  AuthService  from "./../services/AuthService";
import { validateUserLogin, validateUserRegistration } from "./../validators/userValidator";
import { UserToRegisterDTO, UserToLoginDTO } from "./../dtos/user.dto";
import { User } from "./../entities/User";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user: UserToRegisterDTO = req.body;
        validateUserRegistration(user);
        const registeredUser: User = await userService.register(user);
        const token = AuthService.generateToken(req.body.deviceId, registeredUser);
        res.status(201).json({ message: 'Usuario registrado con éxito.', token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try{
        const user: UserToLoginDTO = req.body;
        validateUserLogin(user);
        await userService.login(user);
        res.status(200).json({ message: 'Usuario logueado con éxito.' });
    } catch(error: any){
        res.status(400).json({ message: error.message });
    }
}