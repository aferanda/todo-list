import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import styles from './Header.module.css';

import rocketImg from '../assets/rocket.svg';

interface HeaderProps {
  page?: string;
}

export function Header({ page }: HeaderProps) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <header className={styles.header}>
      {page === "tasks" ? (
        <div className={styles.container}>
          <div>
            <img src={rocketImg} alt="rocket" />
            <h1>
              to
              <span>do</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className={styles.logout}
          >
            <FiLogOut />
          </button>
        </div>
      ) : (
        <div className={`${styles.container} ${styles.login}`}>
          <div>
            <img src={rocketImg} alt="rocket" />
            <h1>
              to
              <span>do</span>
            </h1>
          </div>
        </div>
      )}
    </header>
  )
}