import User from '../models/userModel.js';

// Send or toggle a friend request
export const toggleFriendRequest = async (req, res, next) => {
  try {
    const friendId = req.params.friendId;
    const userId = req.user._id;

    const friend = await User.findById(friendId);
    const user = await User.findById(userId);

    if (!friend) return res.status(404).json({ message: 'User not found' });

    const isFriend = user.friends.includes(friendId);

    if (isFriend) {
      user.friends.pull(friendId);
      friend.friends.pull(userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    res.status(200).json({ message: isFriend ? 'Friend removed' : 'Friend added' });
  } catch (error) {
    next(error);
  }
};

// Get user's friends
export const getFriends = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('friends', 'name email');
    res.status(200).json(user.friends);
  } catch (error) {
    next(error);
  }
};

// Get pending friend requests
export const getPendingRequests = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('friendRequests', 'name email');
    res.status(200).json(user.friendRequests);
  } catch (error) {
    next(error);
  }
};

// Accept or reject a friend request
export const respondToFriendRequest = async (req, res, next) => {
  try {
    const friendId = req.params.friendId;
    const user = await User.findById(req.user._id);

    const requestIndex = user.friendRequests.indexOf(friendId);
    if (requestIndex === -1) return res.status(400).json({ message: 'Friend request not found' });

    const { action } = req.body; // "accept" or "reject"

    if (action === 'accept') {
      user.friends.push(friendId);
    }

    user.friendRequests.splice(requestIndex, 1);
    await user.save();

    res.status(200).json({ message: `Friend request ${action}ed successfully` });
  } catch (error) {
    next(error);
  }
};
