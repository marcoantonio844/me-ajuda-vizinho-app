const mongoose = require('mongoose');

// URL de Conexão já corrigida com sua senha de teste
const MONGO_URL = "mongodb+srv://marcosantoniojosesantana_db_user:teste123456@cluster0.cu3doah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Função para conectar ao banco de dados
async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Conectado ao banco de dados MongoDB!");
  } catch (error) {
    console.log("❌ Erro ao conectar ao banco de dados:", error.message);
  }
}

module.exports = { connect };