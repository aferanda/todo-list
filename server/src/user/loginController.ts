import { Request, Response } from "express";
import LoginService from './loginService';

class LoginController {
  async login(req: Request, res: Response) {
    const { code, message, token } = await LoginService.login(req.body);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ token });
  }
  async create(req: Request, res: Response) {
    const { code, message, token } = await LoginService.create(req.body);

    if (message) return res.status(code).json({ message });

    return res.status(code).json({ token });
  }
}

export default new LoginController();