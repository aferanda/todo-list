import { Request, Response } from "express";
import TaskService from "./taskService";

class TaskController {
  async create(req: Request, res: Response) {
    const { title, isComplete, tokenData: { id: userId } } = req.body;
    const { code, newTask } = await TaskService.create({ title, isComplete, userId });

    return res.status(code).json(newTask);
  }

  async getTasks(req: Request, res: Response) {
    const { tokenData } = req.body;
    const { id: userId } = tokenData;

    const { code, tasks } = await TaskService.getTasks(userId);

    return res.status(code).json(tasks);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { code, message } = await TaskService.delete(id);

    return res.status(code).json(message);
  }

  async doneTask(req: Request, res: Response) {
    const { id } = req.params;
    const { isDone } = req.body;

    const { code, message } = await TaskService.doneTask({ id, isDone });

    return res.status(code).json(message);
  }
}

export default new TaskController();