import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LoginProps {
  username: string;
  email: string;
}

class LoginService {
  async create(body: LoginProps) {
    const { username, email } = body;
    let userId = "";
    let code = 0;

    const findUser = await prisma.user.findUnique({
      where: { email }
    });

    if (findUser) {
      userId = findUser.id;
      code = 200;
    } else {
      const user = await prisma.user.create({
        data: {
          username,
          email
        }
      });
      userId = user.id;
      code = 201;
    }

    return { code, userId };
  }
}

export default new LoginService();