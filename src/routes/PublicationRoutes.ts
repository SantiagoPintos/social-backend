import express from "express";
import { getUserPosts, newUserPost, newComment } from "@/controllers/PublicationController";
import { authUser } from "@/middleware/auth.middleware";
import { userIdValidator } from "@/middleware/userIdValidator.middleware";

const router = express.Router();
router.get('/', authUser, userIdValidator, getUserPosts);
router.post('/', authUser, userIdValidator, newUserPost);
router.post('/:postId/comments', authUser, userIdValidator, newComment);

export default router;