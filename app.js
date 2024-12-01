import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/users', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/otp', otpRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;
    