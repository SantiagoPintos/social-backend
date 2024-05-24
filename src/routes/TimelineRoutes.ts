import express from 'express';
import { getUserTimeline } from '@/controllers/TimelineController';
import { authUser } from "@/middleware/auth.middleware";
import { userIdValidator } from "@/middleware/userIdValidator.middleware";

const router = express.Router();
router.get('/', authUser, userIdValidator, getUserTimeline);

export default router;
