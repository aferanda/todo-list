import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

import { createTask, getTasks } from '../service/api';

import styles from './NewTask.module.css';
import plusImg from '../assets/plus.svg';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

interface NewTaskProps {
  userId: string;
  setTasks: Dispatch<React.SetStateAction<Task[]>>;
}

export function NewTask({ userId, setTasks }: NewTaskProps) {
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    await createTask({ title: newTask, isComplete: false, userId });
    setNewTask('');
    const data = await getTasks(userId);
    setTasks(data);
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.newTask}>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={handleNewTaskChange}
      />
      <button disabled={newTask === ''}>
        Create
        <img src={plusImg} alt="plus symbol" />
      </button>
    </form>
  )
}