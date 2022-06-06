import { v4 as uuidv4 } from 'uuid';
import { NewTask } from "./NewTask";

import styles from './Task.module.css';
import clipboardImg from '../assets/clipboard.svg';
import trashImg from '../assets/trash.svg';


export function Task() {
  const taskList = [
    {
      id: uuidv4(),
      title: 'Estudar TypeScript',
      isComplete: false
    },
    {
      id: uuidv4(),
      title: 'Arrumar a casa',
      isComplete: false
    },
    {
      id: uuidv4(),
      title: 'Fazer compras',
      isComplete: true
    },
    {
      id: uuidv4(),
      title: 'Passear com o pet',
      isComplete: false
    },
  ]
  return (
    <>
      <NewTask />
      <section className={styles.tasks}>
        <div className={styles.tasksInfo}>
          <strong className={styles.createdTaskCounter}>
            Tarefas criadas
            <span>0</span>
          </strong>
          <strong className={styles.taskDoneCounter}>
            Concluídas
            <span>0</span>
          </strong>
        </div>
        {taskList.length
          ? (
            <div className={styles.taskBox}>
              {taskList.map(({ id, title, isComplete }) => (
                <div key={id} className={styles.task}>
                  <div className={styles.round}>
                    <input type="checkbox" id={id} checked={isComplete} />
                    <label htmlFor={id} />
                  </div>
                  <p>{title}</p>
                  <button />
                </div>
              ))}
            </div>
          )
          : (
            <div className={styles.emptyTaskBox}>
              <img src={clipboardImg} alt="clipboard" />
              <strong>
                Você ainda não tem tarefas cadastradas
                <p>Crie tarefas e organize seus itens a fazer</p>
              </strong>
            </div>
          )}
      </section>
    </>
  )
}
