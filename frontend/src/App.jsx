import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import io from 'socket.io-client';

import styles from './App.module.css';
import Header from './components/Header';
import PedidoForm from './components/PedidoForm';
import PedidoCard from './components/PedidoCard';
import { useAuth } from './contexts/AuthContext';

// A URL da nossa API, vinda das variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  // Função para buscar a lista inicial de pedidos
  async function fetchPedidos() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/pedidos`);
      setPedidos(response.data);
    } catch (error) { 
      console.error("Erro ao buscar os pedidos:", error); 
    } finally {
      setIsLoading(false);
    }
  }

  // Busca os pedidos quando a página carrega
  useEffect(() => { 
    fetchPedidos(); 
  }, []);

  // --- A LÓGICA DO SOCKET AGORA VIVE DENTRO DE UM useEffect ---
  // Isso garante que a conexão só será estabelecida no navegador e após o componente montar
  useEffect(() => {
    // Só tenta conectar se tivermos a URL da API
    if (API_URL) {
      const socket = io(API_URL);

      socket.on('connect', () => {
        console.log('Conectado ao servidor de Socket.IO!');
      });

      socket.on('novoPedido', (novoPedido) => {
        setPedidos((listaAtual) => [novoPedido, ...listaAtual]);
        toast.success(`Novo pedido de "${novoPedido.title}" na comunidade!`, { icon: '🔔' });
      });

      // Função de "limpeza": desconecta quando o componente sai da tela
      return () => {
        console.log('Desconectando do Socket.IO...');
        socket.disconnect();
      };
    }
  }, []); // O array vazio garante que rode apenas uma vez

  // Funções de CRUD (sem alterações na lógica, apenas na URL)
  async function handleCreatePedido(newPedidoData) {
    const createPromise = axios.post(`${API_URL}/pedidos`, newPedidoData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.promise(createPromise, {
      loading: 'Publicando seu pedido...',
      success: 'Pedido publicado com sucesso!',
      error: 'Erro ao publicar o pedido.',
    });
  }

  async function handleDeletePedido(id) {
    if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
      const deletePromise = axios.delete(`${API_URL}/pedidos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.promise(deletePromise, {
        loading: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Erro ao deletar.',
      });
      await deletePromise;
      setPedidos(pedidos.filter(pedido => pedido._id !== id));
    }
  }

  async function handleUpdatePedido(id, updatedData) {
    const updatePromise = axios.put(`${API_URL}/pedidos/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.promise(updatePromise, {
      loading: 'Salvando...',
      success: 'Salvo com sucesso!',
      error: 'Erro ao salvar.',
    });
    const response = await updatePromise;
    setPedidos(pedidos.map(p => p._id === id ? response.data : p));
  }

  return (
    <div className={styles.container}>
      <Toaster 
        position="top-right"
        toastOptions={{ duration: 4000 }}
      />
      <Header />
      {user && <PedidoForm onCreatePedido={handleCreatePedido} />}
      <hr />
      <h2 className={styles.subTitle}>Pedidos da Comunidade:</h2>
      {isLoading ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Carregando pedidos...</p>
      ) : (
        <div>
          {pedidos.map(pedido => (
            <PedidoCard 
              key={pedido._id}
              pedido={pedido}
              onDelete={handleDeletePedido}
              onUpdate={handleUpdatePedido}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;