import { useState } from 'react';
import styles from './PedidoForm.module.css';

function PedidoForm({ onCreatePedido }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title || !description) {
      alert("Por favor, preencha o título e a descrição.");
      return;
    }

    // Chama a função que veio do App.jsx, passando os dados
    await onCreatePedido({ title, description });

    // Limpa os campos após o envio
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3>Criar novo pedido de ajuda</h3>
      <input 
        type="text" 
        placeholder="Título" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Descrição" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">Publicar Pedido</button>
    </form>
  );
}

export default PedidoForm;