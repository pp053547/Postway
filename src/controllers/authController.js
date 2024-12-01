import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, gender });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Add token to user's tokens array
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// Logout User (from current session)
export const logoutUser = async (req, res, next) => {
  try {
    // Remove the token used in the current session
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// Logout User (from all devices)
export const logoutUserFromAllDevices = async (req, res, next) => {
  try {
    // Clear all tokens from user's tokens array
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ message: 'Logged out from all devices successfully' });
  } catch (error) {
    next(error);
  }
};
