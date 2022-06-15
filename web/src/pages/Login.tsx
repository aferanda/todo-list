import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { createUser } from "../service/api";

import styles from './Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { target: { name, value } } = event;
    setUser(state => ({ ...state, [name]: value }));
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const userId = await createUser(user);
    setUser({ username: "", email: "" });
    localStorage.setItem('userId', JSON.stringify(userId));
    navigate('/tasks');
  }

  return (
    <>
      <Header />
      <section className={styles.loginBox}>
        <form
          className={styles.loginInfo}
          onSubmit={handleLogin}
        >
          <input
            type="text"
            name="username"
            value={user.username}
            placeholder="Nome"
            onChange={handleChangeInput}
          />
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChangeInput}
          />
          <button>
            Entrar
          </button>
        </form>
      </section>
    </>
  )
}