const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. Importa o jsonwebtoken

// Crie uma "chave secreta" para assinar os tokens. Em um projeto real, isso ficaria em um arquivo .env!
const authSecret = 'meajudavizinhosecret123456'; 

class UserController {
  // Função create (registro) - continua a mesma
  async create(request, response) {
    try {
      const { name, email, password } = request.body;
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ name, email, password: hashedPassword });
      user.password = undefined;
      return response.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        return response.status(400).json({ error: 'Este e-mail já está em uso.' });
      }
      return response.status(400).json({ error: error.message });
    }
  }

  // 2. NOVA FUNÇÃO DE LOGIN
  async login(request, response) {
    const { email, password } = request.body;

    // Acha o usuário pelo e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Compara a senha enviada com a senha hasheada no banco
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({ error: 'Senha inválida.' });
    }

    // Se tudo estiver correto, gera o token (nosso "passaporte")
    const token = jwt.sign({ id: user._id }, authSecret, { expiresIn: '1d' }); // Expira em 1 dia

    user.password = undefined; // Remove a senha da resposta

    return response.json({ user, token });
  }
}

module.exports = UserController;