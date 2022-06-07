import React, { ChangeEvent, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './NewTask.module.css';
import plusImg from '../assets/plus.svg';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

interface NewTaskProps {
  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
}

export function NewTask({ tasks, setTasks }: NewTaskProps) {
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, { id: uuidv4(), title: newTask, isComplete: false }]);
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
      <button>
        Criar
        <img src={plusImg} alt="plus symbol" />
      </button>
    </form>
  )
}