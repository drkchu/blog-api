const express = require('express');
const { getAllComments, createComment } = require('../controllers/commentController');

const router = express.Router();

// Comment routes
router.get('/', getAllComments);
router.post('/', createComment);

module.exports = router;
