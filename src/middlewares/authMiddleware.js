import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from the header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if token exists in the user's tokens array
    const isTokenValid = user.tokens.some((t) => t.token === token);
    if (!isTokenValid) {
      return res.status(401).json({ message: 'Token is no longer valid' });
    }

    // Attach the user and token to the request object
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
