import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LoginProps {
  username: string;
  email: string;
}

class LoginService {
  async create(body: LoginProps) {
    const { username, email } = body;

    const findUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!findUser) {
      const user = await prisma.user.create({
        data: {
          username,
          email
        }
      });

      return { code: 201, userId: user.id };
    }

    return { code: 200, userId: findUser.id };
  }
}

export default new LoginService();