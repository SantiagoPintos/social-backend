import express from "express";
import { getUserPosts } from "./../controllers/PublicationController";

const router = express.Router();
router.get('/', getUserPosts);

export default router;