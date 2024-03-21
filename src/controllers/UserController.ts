import { Request, Response } from "express";
import { UserService } from "./../services/UserService";
import { validateUserRegistration } from "./../validators/userValidator";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
    try {
        validateUserRegistration(req.body);
        await userService.register(req.body);
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

}