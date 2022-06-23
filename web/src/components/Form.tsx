import { ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

import styles from './Form.module.css';

interface FormProps {
  route: '/register' | '/';
  page: 'login' | 'register';
  handleLogin: (event: FormEvent) => void;
}

export function Form({route, page, handleLogin}: FormProps) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event;
    setUser(state => ({ ...state, [name]: value }));
  }

  return (
    <form
      className={styles.loginInfo}
      onSubmit={handleLogin}
    >
      { page === 'register' && (
        <input
          type="text"
          name="username"
          value={user.username}
          placeholder="Name"
          required
          onChange={handleChangeInput}
        />
      )}
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Email"
        required
        onChange={handleChangeInput}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Password"
        required
        onChange={handleChangeInput}
      />
      { page === 'register' && (
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          placeholder="Password"
          required
          onChange={handleChangeInput}
      />
      )}
      <button type="submit">
      { page === 'register' ? 'Register' : 'Login' }
      </button>
      <div className={styles.loginAux}>
        <button
          type="button"
          onClick={() => navigate(route)}
        >
          { page === 'register' ? 'Login' : 'Sign In' }
        </button>
        <button type="button">Forgot your password?</button>
      </div>
    </form>
  )
}