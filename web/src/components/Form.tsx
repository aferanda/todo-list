import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

import { createUser, loginUser } from "../service/api";

import styles from './Form.module.css';

interface FormProps {
  route: string;
  page: string;
}

export function Form({route, page}: FormProps) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event;
    setUser(state => ({ ...state, [name]: value }));
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (page === 'login') {
      const data = await loginUser(user);

      if (!data) {
        alert('usuário ou senha incorretos');
        return setUser({ username: "", email: "", password: "", confirmPassword: "" });
      }

      localStorage.setItem('userId', JSON.stringify(data.userId));
      setUser({ username: "", email: "", password: "", confirmPassword: "" });
      navigate('/tasks');
    }

    if (page === 'register') {
      if (user.password !== user.confirmPassword) {
        alert('passwords do not match');
        return;
      }

      const data = await createUser(user);

      if (!data) {
        alert('usuário já cadastrado');
        return setUser({ username: "", email: "", password: "", confirmPassword: "" });
      }

      localStorage.setItem('userId', JSON.stringify(data.userId));
      setUser({ username: "", email: "", password: "", confirmPassword: "" });
      navigate('/tasks');
    }
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