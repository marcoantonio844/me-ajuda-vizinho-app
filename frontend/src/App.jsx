import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import io from 'socket.io-client'; // Importa o cliente do Socket.IO

import styles from './App.module.css';

import Header from './components/Header';
import PedidoForm from './components/PedidoForm';
import PedidoCard from './components/PedidoCard';
import { useAuth } from './contexts/AuthContext';


const socket = io('http://localhost:3333');

function App() {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  async function fetchPedidos() {
    setIsLoading(true);
    try {
      const response = await axios.get(${import.meta.env.VITE_API_URL}/pedidos);
      setPedidos(response.data);
    } catch (error) { 
      console.error("Erro ao buscar os pedidos:", error); 
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => { 
    fetchPedidos(); 
  }, []);

 
  useEffect(() => {
    
    socket.on('novoPedido', (novoPedido) => {
      
      setPedidos((listaAtual) => [novoPedido, ...listaAtual]);
     
      toast.success(`Novo pedido de "${novoPedido.title}" na comunidade!`, {
        icon: '🔔',
      });
    });

    
    return () => {
      socket.off('novoPedido');
    };
  }, []); 

  
  async function handleCreatePedido(newPedidoData) {
    const createPromise = axios.post('http://localhost:3333/pedidos', newPedidoData, {
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
      const deletePromise = axios.delete(`http://localhost:3333/pedidos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.promise(deletePromise, {
        loading: 'Deletando pedido...',
        success: 'Pedido deletado com sucesso!',
        error: 'Erro ao deletar o pedido.',
      });
      await deletePromise;
      setPedidos(pedidos.filter(pedido => pedido._id !== id));
    }
  }

  
  async function handleUpdatePedido(id, updatedData) {
    const updatePromise = axios.put(`http://localhost:3333/pedidos/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.promise(updatePromise, {
      loading: 'Salvando alterações...',
      success: 'Pedido atualizado com sucesso!',
      error: 'Erro ao atualizar o pedido.',
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