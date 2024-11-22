const { register } = require('../controllers/userController');
const { createPost } = require('../controllers/postController');
const { createComment } = require('../controllers/commentController');
const express = require('express');
const bodyParser = require('body-parser');

// Mock `req` and `res`
const mockReq = (body) => ({ body });
const mockRes = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    return res;
  };
  return res;
};

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Register Users
    const user1Res = mockRes();
    await register(mockReq({ username: 'david', password: 'davids_password' }), user1Res);
    const user1Id = user1Res.body.user.id;

    const user2Res = mockRes();
    await register(mockReq({ username: 'diana', password: 'dianas_password' }), user2Res);
    const user2Id = user2Res.body.user.id;

    console.log('Users created:', { user1: user1Res.body, user2: user2Res.body });

    // Create Posts
    const post1Res = mockRes();
    await createPost(
      mockReq({
        userId: user1Id,
        title: 'David\'s First Post',
        content: 'This is David\'s first post content.',
        status: 'published',
        tags: ['introduction', 'david'],
      }),
      post1Res
    );
    const post1Id = post1Res.body.id;

    const post2Res = mockRes();
    await createPost(
      mockReq({
        userId: user2Id,
        title: 'Diana\'s Thoughts',
        content: 'Diana shares some thoughts on coding.',
        status: 'draft',
        tags: ['coding', 'thoughts'],
      }),
      post2Res
    );
    const post2Id = post2Res.body.id;

    console.log('Posts created:', { post1: post1Res.body, post2: post2Res.body });

    // Create Comments
    const comment1Res = mockRes();
    await createComment(
      mockReq({
        postId: post1Id,
        userId: user2Id,
        content: 'Great post, David!',
      }),
      comment1Res
    );

    const comment2Res = mockRes();
    await createComment(
      mockReq({
        postId: post2Id,
        userId: user1Id,
        content: 'Thanks for sharing, Diana!',
      }),
      comment2Res
    );

    console.log('Comments created:', { comment1: comment1Res.body, comment2: comment2Res.body });

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

seedDatabase();
