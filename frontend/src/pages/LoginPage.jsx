import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 1. Importa o useAuth
import styles from './Auth.module.css';

function LoginPage() {
  const [email, setEmail] = useState(''); // 2. Cria estados para os inputs
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // 3. Pega a função de login do contexto

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password); // 4. Chama a função de login real
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          {/* 5. Conecta os inputs aos estados */}
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className={styles.authButton}>Login</button>
        <p className={styles.switchLink}>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;