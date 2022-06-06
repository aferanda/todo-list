import { NewTask } from "./NewTask";

import styles from './Task.module.css';
import clipboardImg from '../assets/clipboard.svg';

export function Task() {
  return (
    <>
      <NewTask />
      <div className={styles.tasks}>
        <div className={styles.tasksInfo}>
          <strong className={styles.createdTasks}>
            Tarefas criadas
            <span>0</span>
          </strong>
          <strong className={styles.completedTasks}>
            Concluídas
            <span>0</span>
          </strong>
        </div>

        <div className={styles.tasksBox}>
          <img src={clipboardImg} alt="clipboard" />
          <strong>
            Você ainda não tem tarefas cadastradas
          <p>Crie tarefas e organize seus itens a fazer</p>
          </strong>
        </div>
      </div>
    </>
  )
}