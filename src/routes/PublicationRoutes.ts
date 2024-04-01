import express from "express";
import { getUserPosts, newUserPost, newUserPostComment, getUserPostsComment } from "./../controllers/PublicationController";

const router = express.Router();
router.get('/', getUserPosts);
router.post('/', newUserPost);
router.post('/comments', newUserPostComment);
router.get('/comments', getUserPostsComment)

export default router;