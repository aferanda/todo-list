import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/user";
import { Header } from "../components/Header";
import { Form } from "../components/Form";

import styles from './Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const { setUser, authenticate } = useContext(UserContext);

  const route = '/register';
  const page = 'login';

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const data = await authenticate();

    if (!data) {
      alert('usuário ou senha incorretos');
      return setUser({ username: "", email: "", password: "", confirmPassword: "" });
    }

    setUser({ username: "", email: "", password: "", confirmPassword: "" });
    navigate('/tasks');
  }

  return (
    <>
      <Header />
      <section className={styles.loginBox}>
        <Form route={route} page={page} handleLogin={handleLogin} />
      </section>
    </>
  )
}