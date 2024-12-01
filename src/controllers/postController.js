import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// Create a new post
export const createPost = async (req, res, next) => {
  try {
    const { caption, imageUrl } = req.body;
    const userId = req.user._id; // assuming user is authenticated and attached to req
    const post = new Post({ caption, imageUrl, user: userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// Get all posts (for newsfeed)
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Get a specific post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('user', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Update a post
export const updatePost = async (req, res, next) => {
  try {
    const { caption, imageUrl } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    post.caption = caption || post.caption;
    post.imageUrl = imageUrl || post.imageUrl;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Delete a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
