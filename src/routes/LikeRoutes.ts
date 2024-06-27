import Router from "express";
import { likePost } from "@/controllers/LikeController";
import { authUser } from "@/middleware/auth.middleware";
import { userIdValidator } from "@/middleware/userIdValidator.middleware";

const router = Router();
router.post('/:type/:postId', authUser, userIdValidator, likePost);

export default router;
