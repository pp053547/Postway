import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { toggleFriendRequest, getFriends, getPendingRequests, respondToFriendRequest } from '../controllers/friendController.js';

const router = express.Router();

router.post('/toggle-friendship/:friendId', authMiddleware, toggleFriendRequest);   // Toggle friendship
router.get('/get-friends', authMiddleware, getFriends);                             // Get friends list
router.get('/get-pending-requests', authMiddleware, getPendingRequests);            // Get pending friend requests
router.post('/response-to-request/:friendId', authMiddleware, respondToFriendRequest);  // Accept or reject friend request

export default router;
