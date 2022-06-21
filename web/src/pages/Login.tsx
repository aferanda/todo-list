import { Header } from "../components/Header";
import { Form } from "../components/Form";

import styles from './Login.module.css';

export function Login() {
  const route = '/register';
  const page = 'login';

  return (
    <>
      <Header />
      <section className={styles.loginBox}>
        <Form route={route} page={page} />
      </section>
    </>
  )
}