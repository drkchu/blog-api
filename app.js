const express = require("express");
const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


require("dotenv").config();

const app = express();
const PORT = process.env.PORT ||3000;

app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
