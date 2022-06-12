import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id }
  });

  return res.status(200).json({ message: "task removed with sucess" });
});

app.patch('/tasks/:id/:isDone', async (req, res) => {
  const { id, isDone } = req.params;

  await prisma.task.update({
    where: { id },
    data: { isComplete: JSON.parse(isDone) }
  });

  return res.status(200).json({ message: "task updated with sucess" });
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));