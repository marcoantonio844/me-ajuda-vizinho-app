const express = require('express');
const cors = require('cors');
const http = require('http'); 
const { Server } = require("socket.io"); 

const { connect } = require('./database/index');

const usersRouter = require('./routes/users.routes.js');
const pedidosRouter = require('./routes/pedidos.routes.js');

const app = express();
connect();

app.use(cors());
app.use(express.json());


const server = http.createServer(app); 


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
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