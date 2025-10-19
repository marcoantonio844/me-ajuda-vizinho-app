const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const { connect } = require('./database/index');

const usersRouter = require('./routes/users.routes.js');
const pedidosRouter = require('./routes/pedidos.routes.js');

const app = express();
connect();

const allowedOrigins = [
  'http://localhost:5173', 
  'https://me-ajuda-vizinho-app.vercel.app' 
];


const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"]
};


app.use(cors(corsOptions));


app.use(express.json());
    
const server = http.createServer(app); 


const io = new Server(server, {
  cors: corsOptions
});

app.use((request, response, next) => {
  request.io = io;
  return next();
});

app.use('/users', usersRouter);
app.use('/pedidos', pedidosRouter);

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});