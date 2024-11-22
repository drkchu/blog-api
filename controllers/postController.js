const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a post by ID
const getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, title, content, status, tags } = req.body;
    const newPost = await prisma.post.create({
      data: { userId, title, content, status, tags },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a post
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, status, tags } = req.body;

    // Find the post
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure the logged-in user is the owner
    if (post.userId !== req.user.id) {
      return res.status(403).json({ error: "You do not have permission to edit this post" });
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, status, tags },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPosts, getPostById, createPost, editPost };
