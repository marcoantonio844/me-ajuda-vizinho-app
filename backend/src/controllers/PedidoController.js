const Pedido = require('../models/Pedido');

class PedidoController {
async create(request, response) {
    try {
      const { title, description } = request.body;
      const pedido = await Pedido.create({ 
        title, 
        description, 
        user: request.userId 
      });
      await pedido.populate('user');

      request.io.emit('novoPedido', pedido);

      return response.status(201).json(pedido);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }


  async index(request, response) {
    try {
      const pedidos = await Pedido.find().populate('user');
      return response.json(pedidos);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // NOVA FUNÇÃO PARA BUSCAR PEDIDOS DO USUÁRIO LOGADO
  async indexByUser(request, response) {
    try {
      const userId = request.userId;
      const pedidos = await Pedido.find({ user: userId }).populate('user');
      return response.json(pedidos);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { title, description } = request.body;
      const pedido = await Pedido.findByIdAndUpdate(id, {
        title,
        description
      }, { new: true });

      if (!pedido) {
        return response.status(404).json({ error: 'Pedido não encontrado.' });
      }

      await pedido.populate('user');
      return response.json(pedido);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const pedido = await Pedido.findByIdAndDelete(id);

      if (!pedido) {
        return response.status(404).json({ error: 'Pedido não encontrado.' });
      }

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = PedidoController;