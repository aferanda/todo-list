import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/user";
import { Header } from "../components/Header";
import { Form } from "../components/Form";

import styles from './Login.module.css';

export function Login() {
  const navigate = useNavigate();
  const { authenticate } = useContext(UserContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      const data = await authenticate();
      if (data) return navigate('/tasks');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <section className={styles.loginBox}>
        <Form route="/register" page="login" handleLogin={handleLogin} />
      </section>
    </>
  )
}