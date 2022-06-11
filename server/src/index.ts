import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  await prisma.user.create({
    data: {
      name,
      email
    }
  });

  return res.status(201).json('create');
});

app.post('/tasks', async (req, res) => {
  const { title, isComplete, userId } = req.body;
  const newTask = await prisma.task.create({
    data: {
      title,
      isComplete,
      userId
    }
  });

  return res.status(201).json(newTask);
});

app.get('/tasks', async (_req, res) => {
  const tasks = await prisma.task.findMany();

  return res.status(200).json(tasks);
});

app.delete('/tasks', async (_req, res) => {
  // await prisma.task.delete();

  return res.status(200).json({ message: "task removed with sucess" });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));