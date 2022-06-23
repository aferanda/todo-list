import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

const jwtConfig = {
  expiresIn: '1d',
}

interface IToken {
  id: string;
  email: string;
}

export const jwtGenerator = ({id, email}: IToken) => jwt.sign({ id, email }, SECRET, jwtConfig);