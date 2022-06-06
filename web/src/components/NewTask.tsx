import styles from './NewTask.module.css';
import plusImg from '../assets/plus.svg';

export function NewTask() {
  return (
    <div className={styles.newTask}>
      <input type="text" placeholder="Adicione uma nova tarefa" />
      <button>
        Criar
        <img src={plusImg} alt="plus symbol" />
      </button>
    </div>
  )
}