const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      username: 'alice',
      password: 'password123', // this ain't hashed btw
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'bob',
      password: 'securepassword',
    },
  });

  // Create some posts
  const post1 = await prisma.post.create({
    data: {
      userId: user1.id,
      title: 'Alice\'s First Post',
      content: 'This is the content of Alice\'s first post.',
      status: 'published',
      tags: ['introduction', 'alice'],
    },
  });

  const post2 = await prisma.post.create({
    data: {
      userId: user2.id,
      title: 'Bob\'s Thoughts',
      content: 'This is what Bob thinks about Prisma.',
      status: 'draft',
      tags: ['thoughts', 'bob'],
    },
  });

  // Create some comments
  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      userId: user2.id,
      content: 'Great post, Alice!',
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      postId: post2.id,
      userId: user1.id,
      content: 'Thanks for sharing, Bob!',
    },
  });

  console.log('Dummy data has been added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
