import { Router } from "express";
import { Auth } from "../middlewares/auth";
import TaskController from "./taskController";

const route = Router();

route.post('/create', Auth, TaskController.create);
route.get('/list', Auth, TaskController.getTasks);
route.patch('/update/:id', Auth, TaskController.doneTask);
route.delete('/delete/:id', Auth, TaskController.delete);

export default route;