const express = require('express');
const { getAllUsers, getUserById, createUser, register, login } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
