const { Router } = require('express');
const PedidoController = require('../controllers/PedidoController');
const authMiddleware = require('../middlewares/auth'); 

const pedidosRouter = Router();
const pedidoController = new PedidoController();

pedidosRouter.get('/', pedidoController.index);


pedidosRouter.use(authMiddleware); 

pedidosRouter.get('/meus', pedidoController.indexByUser);

pedidosRouter.post('/', pedidoController.create);
pedidosRouter.put('/:id', pedidoController.update);
pedidosRouter.delete('/:id', pedidoController.delete);

module.exports = pedidosRouter;