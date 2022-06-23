import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { loginUser } from '../service/api';

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserAuth {
  userId: string;
  token: string;
}

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  authenticate: () => Promise<UserAuth>;
}

interface UserProvider {
  children: JSX.Element;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export function UserProvider({ children }: UserProvider) {
  const [user, setUser] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  async function authenticate() {
    const data = await loginUser({ email: user.email, password: user.password });

    if (!data) {
      alert('usuário ou senha inválidos');
      return setUser({ username: "", email: "", password: "", confirmPassword: "" });
    }

    localStorage.setItem('token', JSON.stringify(data.token));

    return data;
  }

  const context = {
    user,
    setUser,
    authenticate,
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )

}
