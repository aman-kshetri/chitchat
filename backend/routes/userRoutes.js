import express from 'express';
import { signup, login, updateProfile, checkAuth } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';
import { authLimiter } from '../middleware/authRateLimiter.js';

const userRouter = express.Router();

userRouter.post('/signup', authLimiter, signup);
userRouter.post('/login', authLimiter, login);
userRouter.put('/update-profile', protectRoute, updateProfile);
userRouter.get('/check', protectRoute, checkAuth);

export default userRouter;