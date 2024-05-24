import { Response, Request } from "express";
import TimelineService from "@/services/TimelineService";
import UserError from "@/errors/User/UserError";

export async function getUserTimeline(req: Request, res: Response): Promise<void> {
    try {
        const user = (req as Request & { user: number }).user;
        if (!user || user < 0) throw new UserError('Invalid user');
        const timeline = await TimelineService.getTimeline(user);
        res.status(200).json({ message: 'User timeline', timeline: timeline });
    } catch (error: unknown) {
        if((error as Error).name == 'UserError') {
            res.status(400).json({ message: (error as Error).message });
        } else {
            console.log((error as Error).message);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}