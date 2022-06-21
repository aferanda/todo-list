import { Request, Response } from "express";
import LoginService from './loginService';

class LoginController {
  async login(req: Request, res: Response) {
    const { code, message, userId, token } = await LoginService.login(req.body);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ userId, token });
  }
  async create(req: Request, res: Response) {
    const { code, message, userId, token } = await LoginService.create(req.body);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ userId, token });
  }
}

export default new LoginController();