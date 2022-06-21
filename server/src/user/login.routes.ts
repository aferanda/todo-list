import { Router } from "express";

import LoginController from "./loginController";

const route = Router();

route.post('/', LoginController.login);
route.post('/new', LoginController.create);

export default route;