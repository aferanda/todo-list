import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NewTask } from "./NewTask";
import { getTasks, removeTask, updateDoneTask } from "../service/api";

import styles from './Task.module.css';
import clipboardImg from '../assets/clipboard.svg';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const userId = JSON.parse(localStorage.getItem('userId') || '');

  async function handleCompletedTask(event: ChangeEvent<HTMLInputElement>) {
    await updateDoneTask(event.target.id, event.target.checked);
    const data = await getTasks(userId);
    setTasks(data);
  }

  function completedTaskCounter() {
    return tasks.filter((task) => task.isComplete === true).length;
  }

  async function handleTaskDeletion(id: string) {
    await removeTask(id);
    const data = await getTasks(userId);
    setTasks(data);
  }

  useEffect(() => {
    async function getAllTasks() {
      const data = await getTasks(userId);
      setTasks(data);
    }

    getAllTasks();
  }, []);

  return (
    <>
      <NewTask userId={userId} setTasks={setTasks} />
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
                  <button onClick={() => handleTaskDeletion(id)} />
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
