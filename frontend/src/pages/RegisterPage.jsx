import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importa nosso hook
import styles from './Auth.module.css';

function RegisterPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    register(name, email, password);
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome</label>
          {/* Conecta os inputs aos seus respectivos estados */}
          <input 
            type="text" 
            id="name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className={styles.authButton}>Registrar</button>
        <p className={styles.switchLink}>
          Já tem uma conta? <Link to="/login">Faça o login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;