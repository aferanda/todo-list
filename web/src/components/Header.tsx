import styles from './Header.module.css';

import rocket from '../assets/rocket.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={rocket} alt="rocket" />
        <h1>
          to
          <span>do</span>
        </h1>
      </div>
    </header>
  )
}