const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
}, {
    timestamps: true,
});

const Pedido = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedido;