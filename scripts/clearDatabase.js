const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clearDatabase = async () => {
  try {
    console.log('Clearing database...');

    // Delete all rows in a specific order to avoid foreign key constraint issues
    await prisma.comment.deleteMany();
    console.log('Comments cleared.');

    await prisma.post.deleteMany();
    console.log('Posts cleared.');

    await prisma.user.deleteMany();
    console.log('Users cleared.');

    console.log('Database cleared successfully!');
  } catch (error) {
    console.error('Error clearing database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
};

clearDatabase();
