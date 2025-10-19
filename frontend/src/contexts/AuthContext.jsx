
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  
 
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
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

  const register = async (name, email, password) => {
    try {
        await axios.post(`${API_URL}/users/register`, { name, email, password });
        alert('Conta criada com sucesso! Por favor, faça o login.');
        navigate('/login');
    } catch (error) {
        console.error("Erro no registro:", error);
        alert('Não foi possível criar a conta. O email já pode estar em uso.');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}