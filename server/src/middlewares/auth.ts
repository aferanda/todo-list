import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

interface IToken {
  id: string;
  email: string;
}

export function Auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const SECRET = process.env.JWT_SECRET as Secret;

    const decoded = verify(token, SECRET);

    req.body.tokenData = decoded;

    return next();
  } catch (error: any) {
    return next(
      res.status(401).json({ message: error.message })
    );
  }
}