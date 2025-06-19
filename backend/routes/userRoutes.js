import express from 'express';
import protect from '../middlewares/authMiddlewares.js';
import { getUserProfile ,  uploadProfileImage } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.post('/profile/image', protect, uploadProfileImage);

export default router;
