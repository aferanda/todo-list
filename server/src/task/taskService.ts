import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TaskProps {
  title: string;
  isComplete: boolean;
  userId: string;
}

interface DoneTasksProps {
  id: string;
  isDone: string;
}

class TaskService {
  async create({ title, isComplete, userId }: TaskProps) {
    const newTask = await prisma.task.create({
      data: {
        title,
        isComplete,
        userId
      }
    });
    return { code: 201, newTask };
  }

  async getTasks(userId: string) {
    const tasks = await prisma.task.findMany({
      where: { userId }
    });

    return { code: 200, tasks };
  }

  async delete(id: string) {
    await prisma.task.delete({
      where: { id }
    });

    return { code: 200, message: "task removed with sucess" };
  }

  async doneTask({ id, isDone }: DoneTasksProps) {
    await prisma.task.update({
      where: { id },
      data: { isComplete: JSON.parse(isDone) }
    });

    return { code: 200, message: "task updated with sucess" };
  }
}

export default new TaskService();