import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:postId', authMiddleware, addComment);           // Add a comment to a post
router.put('/:commentId', authMiddleware, updateComment);      // Update a comment
router.delete('/:commentId', authMiddleware, deleteComment);   // Delete a comment

export default router;
