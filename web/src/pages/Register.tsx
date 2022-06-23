import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/user";
import { createUser } from "../service/api";
import { Header } from "../components/Header";
import { Form } from "../components/Form";

import styles from './Register.module.css';

export function Register() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const route = '/';
  const page = 'register';

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

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

  return (
    <>
      <Header />
      <section className={styles.loginBox}>
        <Form route={route} page={page} handleLogin={handleLogin} />
      </section>
    </>
  )
}