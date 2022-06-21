import { Header } from "../components/Header";
import { Form } from "../components/Form";

import styles from './Register.module.css';

export function Register() {
  const route = '/';
  const page = 'register';

  return (
    <>
      <Header />
      <section className={styles.loginBox}>
        <Form route={route} page={page} />
      </section>
    </>
  )
}