import { Router } from 'express';
const router = Router();
import { signup, login } from '../controllers/authControllers.js';
import { forgotPassword, resetPassword } from "../controllers/passwordControllers.js";


router.post('/signup', signup);
router.post('/login', login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
