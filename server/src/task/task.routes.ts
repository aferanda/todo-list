import { Router } from "express";
import TaskController from "./taskController";

const route = Router();

route.post('/', TaskController.create);
route.get('/:userId', TaskController.getTasks);
route.patch('/:id/:isDone', TaskController.doneTask);
route.delete('/:id', TaskController.delete);

export default route;