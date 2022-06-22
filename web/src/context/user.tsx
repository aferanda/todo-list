import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

interface UserProvider {
  children: JSX.Element;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export function UserProvider({ children }: UserProvider) {
  const [user, setUser] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const context = {
    user,
    setUser,
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )

}
