import express from "express";
import { registerUser, loginUser, uploadProfileImage, deleteProfileImage, followUser } from "@/controllers/UserController";
import { authUser } from "@/middleware/auth.middleware";
import { userIdValidator } from "@/middleware/userIdValidator.middleware";
import { upload } from "@/middleware/storage.middleware";

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/:id/profile-image', authUser, userIdValidator, upload.single('profileImage'), uploadProfileImage);
router.delete('/:id/profile-image', authUser, userIdValidator, deleteProfileImage);
router.post('/follow/:id', authUser, userIdValidator, followUser);

export default router;