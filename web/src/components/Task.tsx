import { NewTask } from "./NewTask";

import styles from './Task.module.css';
import clipboardImg from '../assets/clipboard.svg';
import { ChangeEvent, useState } from 'react';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleCompletedTask(event: ChangeEvent<HTMLInputElement>) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === event.target.id) {
        task.isComplete = event.target.checked;
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function completedTaskCounter() {
    return tasks.filter((task) => task.isComplete === true).length;
  }

  return (
    <>
      <NewTask tasks={tasks} setTasks={setTasks} />
      <section className={styles.tasks}>
        <div className={styles.tasksInfo}>
          <strong className={styles.createdTaskCounter}>
            Tarefas criadas
            <span>{tasks.length}</span>
          </strong>
          <strong className={styles.taskDoneCounter}>
            Concluídas
            <span>{`${completedTaskCounter()} de ${tasks.length}`}</span>
          </strong>
        </div>
        {tasks.length
          ? (
            <div className={styles.taskBox}>
              {tasks.map(({ id, title, isComplete }) => (
                <div key={id} className={styles.task}>
                  <div className={styles.round}>
                    <input
                      type="checkbox"
                      id={id}
                      defaultChecked={isComplete}
                      onChange={handleCompletedTask}
                    />
                    <label htmlFor={id} />
                  </div>
                  <p className={isComplete ? styles.titleThrough : styles.title}>{title}</p>
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
