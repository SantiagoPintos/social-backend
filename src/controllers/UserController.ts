import { Request, Response } from "express";
import { UserService } from "./../services/UserService";
import { validateUserRegistration } from "./../validators/userValidator";
import { UserToRegisterDTO } from "./../dtos/user.dto";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user: UserToRegisterDTO = req.body;
        validateUserRegistration(user);
        await userService.register(user);
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

}