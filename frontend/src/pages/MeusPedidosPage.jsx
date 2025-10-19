import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import PedidoCard from '../components/PedidoCard'; 
import styles from '../App.module.css';

function MeusPedidosPage() {
  const [meusPedidos, setMeusPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  // Função dedicada para buscar apenas os pedidos do usuário
  async function fetchMeusPedidos() {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3333/pedidos/meus', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeusPedidos(response.data);
    } catch (error) {
      console.error("Erro ao buscar meus pedidos:", error);
      toast.error("Não foi possível carregar seus pedidos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchMeusPedidos();
    }
  }, [token]);

  // Funções de deletar e atualizar, adaptadas para esta página
  async function handleDeletePedido(id) {
    if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
      const deletePromise = axios.delete(`http://localhost:3333/pedidos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.promise(deletePromise, {
        loading: 'Deletando...',
        success: 'Deletado com sucesso!',
        error: 'Erro ao deletar.',
      });
      await deletePromise;
      fetchMeusPedidos(); // Busca a lista atualizada
    }
  }

  async function handleUpdatePedido(id, updatedData) {
    const updatePromise = axios.put(`http://localhost:3333/pedidos/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.promise(updatePromise, {
      loading: 'Salvando...',
      success: 'Salvo com sucesso!',
      error: 'Erro ao salvar.',
    });
    await updatePromise;
    fetchMeusPedidos(); // Busca a lista atualizada
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <div className={styles.header}>
        <Link to="/" className={styles.navLink} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>&larr; Voltar para a comunidade</Link>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <h1 className={styles.mainTitle}>Meus Pedidos</h1>
        </div>
      </div>

      {isLoading ? (
        <p style={{ color: 'white', textAlign: 'center' }}>Carregando seus pedidos...</p>
      ) : (
        <div>
          {meusPedidos.length > 0 ? (
            meusPedidos.map(pedido => (
              <PedidoCard 
                key={pedido._id}
                pedido={pedido}
                onDelete={handleDeletePedido}
                onUpdate={handleUpdatePedido}
              />
            ))
          ) : (
            <p style={{ color: 'white', textAlign: 'center' }}>Você ainda não criou nenhum pedido.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MeusPedidosPage;