import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/all', authMiddleware, getAllPosts);               // Get all posts
router.post('/', authMiddleware, createPost);                  // Create a post
router.get('/:postId', authMiddleware, getPostById);           // Get a specific post by ID
router.put('/:postId', authMiddleware, updatePost);            // Update a post
router.delete('/:postId', authMiddleware, deletePost);         // Delete a post

export default router;
