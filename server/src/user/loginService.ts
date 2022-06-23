import { PrismaClient } from "@prisma/client";
import { jwtGenerator } from '../helpers/tokenGenerator';
import md5 from 'crypto-js/md5';

const prisma = new PrismaClient();

interface IUser {
  username: string;
  email: string;
  password: string;
}

type ILogin = Omit<IUser, "username">;

class LoginService {
  async login(body: ILogin) {
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== md5(password).toString()) {
      return { code: 404, message: 'Invalid email or password' };
    }

    const token = jwtGenerator({ id: user.id, email: user.email });

    return { code: 200, token };
  }
  async create(body: IUser) {
    const { username, email, password } = body;

    const userExist = await prisma.user.findUnique({
      where: { email }
    });

    if (userExist) return { code: 400, message: 'User already exist' };

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: md5(password).toString(),
      }
    });

    const token = jwtGenerator({ id: user.id, email: user.email });

    return { code: 201, token };
  }
}

export default new LoginService();