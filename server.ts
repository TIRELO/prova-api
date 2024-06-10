import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { post: true } });
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(newUser);
});

app.get('/posts', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({ include: { author: true } });
  res.json(posts);
});

app.post('/posts', async (req: Request, res: Response) => {
  const { title, content, published, authorId } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
  });
  res.json(newPost);
});

app.listen(1, () => {
  console.log('Server is running on http://localhost:3000');
});