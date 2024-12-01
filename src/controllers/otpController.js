import OTP from '../models/otpModel.js';
import User from '../models/userModel.js';
import { sendOtpEmail } from '../utils/otpUtil.js'; // Utility function to send OTP via email
import bcrypt from 'bcryptjs';

// Send OTP for password reset
export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otp = new OTP({ email, otpCode });
    await otp.save();

    await sendOtpEmail(email, otpCode); // Sending OTP via email
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;
    const otp = await OTP.findOne({ email, otpCode });
    if (!otp) return res.status(400).json({ message: 'Invalid OTP' });

    await OTP.deleteOne({ _id: otp._id }); // Remove OTP after successful verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};
