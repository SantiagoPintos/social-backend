import express from "express";
import { getUserPosts, newUserPost, newUserPostComment } from "@/controllers/PublicationController";
import { authUser } from "@/middleware/auth.middleware";

const router = express.Router();
router.get('/', authUser, getUserPosts);
router.post('/', authUser, newUserPost);
router.post('/comments', authUser, newUserPostComment);

export default router;