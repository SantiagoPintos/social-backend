import express from "express";
import { getUserPosts, newUserPost } from "./../controllers/PublicationController";

const router = express.Router();
router.get('/', getUserPosts);
router.post('/', newUserPost);

export default router;