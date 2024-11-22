const express = require('express');
const { getAllPosts, getPostById, createPost, editPost } = require('../controllers/postController');
const { authenticateToken } = require('../middleware/authMiddleware')

const router = express.Router();

// Post routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put("/:id", authenticateToken, editPost);

module.exports = router;
