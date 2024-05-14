import Router from "express";
import { likePost } from "@/controllers/LikeController";
import { authUser } from "@/middleware/auth.middleware";

const router = Router();
router.post('/:type/:postId', authUser, likePost);

export default router;
