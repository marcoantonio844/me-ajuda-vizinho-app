import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './PedidoCard.module.css';
import { format } from 'date-fns'; 

function PedidoCard({ pedido, onDelete, onUpdate }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(pedido.title);
  const [editingDescription, setEditingDescription] = useState(pedido.description);

  const isOwner = user?._id === pedido.user?._id;

  function handleStartEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  async function handleSave() {
    await onUpdate(pedido._id, { title: editingTitle, description: editingDescription });
    setIsEditing(false);
  }

  
  if (isEditing && isOwner) {
    return (
      <div className={styles.pedidoCard}>
        <input 
          type="text" 
          className={styles.editInput}
          value={editingTitle} 
          onChange={(e) => setEditingTitle(e.target.value)} 
        />
        <textarea 
          className={styles.editTextArea}
          value={editingDescription} 
          onChange={(e) => setEditingDescription(e.target.value)} 
        />
        <div className={styles.cardFooter}>
          <small>Editando post de: {pedido.user ? pedido.user.name : 'Usuário desconhecido'}</small>
          <div>
            <button className={styles.editButton} onClick={handleSave}>Salvar</button>
            <button className={styles.cancelButton} onClick={handleCancelEdit}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pedidoCard}>
      <h3>{pedido.title}</h3>
      <p>{pedido.description}</p>
      <div className={styles.cardFooter}>
        {/* Informações do autor e data */}
        <div>
          <small>Postado por: {pedido.user ? pedido.user.name : 'Usuário desconhecido'}</small>
          <br />
          <small className={styles.postDate}>
            {/* Formata e exibe a data de criação do pedido */}
            {format(new Date(pedido.createdAt), "dd/MM/yyyy 'às' HH:mm")}
          </small>
        </div>
        
        {/* Botões de ação, visíveis apenas para o dono do post */}
        {isOwner && (
          <div>
            <button type="button" onClick={handleStartEdit}>Editar</button>
            <button type="button" onClick={() => onDelete(pedido._id)} className={styles.deleteButton}>Deletar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PedidoCard;