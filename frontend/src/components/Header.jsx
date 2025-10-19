import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'; // 1. Importa o Link
import styles from '../App.module.css';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      {/* 2. Transforma o título em um link para a página inicial */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className={styles.mainTitle}>Me Ajuda, Vizinho!</h1>
      </Link>

      <div className={styles.authInfo}>
        {user ? (
          <>
            {/* 3. Adiciona o link para "Meus Pedidos" */}
            <Link to="/meus-pedidos" className={styles.navLink}>Meus Pedidos</Link>
            <span>Olá, {user.name}!</span>
            <button onClick={logout} className={styles.logoutButton}>Sair</button>
          </>
        ) : (
          <span>Você não está conectado.</span>
        )}
      </div>
    </header>
  );
}

export default Header;