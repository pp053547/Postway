import express from 'express';
import { registerUser, loginUser, logoutUser, logoutUserFromAllDevices } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/logout', authMiddleware, logoutUser);                   // Logout from current session
router.post('/logout-all-devices', authMiddleware, logoutUserFromAllDevices);  // Logout from all sessions

export default router;
