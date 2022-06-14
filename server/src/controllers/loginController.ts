import { Request, Response } from "express";
import { LoginService } from "../services";

class LoginController {
  async create(req: Request, res: Response) {
    const { code, userId } = await LoginService.create(req.body);

    return res.status(code).json(userId);
  }
}

export default new LoginController();