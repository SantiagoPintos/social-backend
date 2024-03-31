import express from "express";
import { getUserPosts, newUserPost, newUserPostComment } from "./../controllers/PublicationController";

const router = express.Router();
router.get('/', getUserPosts);
router.post('/', newUserPost);
router.post('/comments', newUserPostComment);

export default router;