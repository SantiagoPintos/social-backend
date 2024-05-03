import express from "express";
import { getUserPosts, newUserPost, newUserPostComment, getUserPostsComment } from "./../controllers/PublicationController";
import { authUser } from "./../middleware/auth.middleware";

const router = express.Router();
router.get('/', authUser, getUserPosts);
router.post('/', authUser, newUserPost);
router.post('/comments', authUser, newUserPostComment);
router.get('/comments', authUser, getUserPostsComment)

export default router;