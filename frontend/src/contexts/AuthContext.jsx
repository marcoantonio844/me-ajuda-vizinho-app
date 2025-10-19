import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Cria o Contexto
const AuthContext = createContext();

// Cria o componente Provedor
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Efeito para carregar dados do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Função de Login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3333/users/login', { email, password });
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      navigate('/');
    } catch (error) {
      console.error("Erro no login:", error);
      alert('Email ou senha inválidos.');
    }
  };

  // NOVO: Função de Registro
  const register = async (name, email, password) => {
    try {
        await axios.post('http://localhost:3333/users/register', { name, email, password });
        // Após o registro, envia o usuário para o login
        alert('Conta criada com sucesso! Por favor, faça o login.');
        navigate('/login');
    } catch (error) {
        console.error("Erro no registro:", error);
        alert('Não foi possível criar a conta. O email já pode estar em uso.');
    }
  };

  // Função de Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    // Adicionamos 'register' ao valor do contexto
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para facilitar o uso do contexto
export function useAuth() {
  return useContext(AuthContext);
}