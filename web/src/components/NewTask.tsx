import { ChangeEvent, FormEvent, useState } from 'react';

import { createTask } from '../service/api';

import styles from './NewTask.module.css';
import plusImg from '../assets/plus.svg';

interface NewTaskProps {
  userId: string;
}

export function NewTask({ userId }: NewTaskProps) {
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    createTask({ title: newTask, isComplete: false, userId });
    setNewTask('');
  }

  return (
    <form onSubmit={handleCreateNewTask} className={styles.newTask}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTask}
        onChange={handleNewTaskChange}
      />
      <button disabled={newTask === ''}>
        Criar
        <img src={plusImg} alt="plus symbol" />
      </button>
    </form>
  )
}