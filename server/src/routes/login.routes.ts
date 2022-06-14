import { Router } from "express";
import { LoginController } from "../controllers";

const route = Router();

route.post('/', LoginController.create);

export default route;