const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const newComment = await prisma.comment.create({
      data: { postId, userId, content },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllComments, createComment };
