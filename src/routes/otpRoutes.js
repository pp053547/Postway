import express from 'express';
import { sendOtp, verifyOtp, resetPassword } from '../controllers/otpController.js';

const router = express.Router();

router.post('/send', sendOtp);                   // Send OTP for password reset
router.post('/verify', verifyOtp);               // Verify OTP
router.post('/reset-password', resetPassword);   // Reset password

export default router;
