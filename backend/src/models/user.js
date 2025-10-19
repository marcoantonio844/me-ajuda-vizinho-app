const mongoose = require('mongoose');

// Aqui definimos a "ficha de cadastro" do nosso usuário
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, // O email deve ser único no banco de dados
  },
  password: {
    type: String,
    required: true,
  },
}, {
  // timestamps cria os campos 'createdAt' e 'updatedAt' automaticamente
  timestamps: true,
});

// Criamos o Model a partir do Schema. É o 'User' que usaremos no nosso código
// para criar, buscar, atualizar e deletar usuários.
const User = mongoose.model('User', UserSchema);

module.exports = User;