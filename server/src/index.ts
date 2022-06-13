import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, email } = req.body;
  let userId = "";
  let code = 0;

  const findUser = await prisma.user.findUnique({
    where: { email }
  });

  if (findUser) {
    userId = findUser.id;
    code = 200;
  }

  if (!findUser) {
    const user = await prisma.user.create({
      data: {
        username,
        email
      }
    });
    userId = user.id;
    code = 201;
  }

  return res.status(code).json(userId);
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

app.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  const tasks = await prisma.task.findMany({
    where: { userId }
  });

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