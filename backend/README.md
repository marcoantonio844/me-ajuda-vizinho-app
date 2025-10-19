# 🚀 Me Ajuda, Vizinho! (Backend)

Este é o repositório do backend para a aplicação "Me Ajuda, Vizinho!", uma plataforma colaborativa onde membros de uma comunidade podem postar pedidos de ajuda e interagir.

Esta API foi construída com Node.js e Express, seguindo as melhores práticas de desenvolvimento, incluindo autenticação segura com Tokens JWT e atualizações em tempo real com WebSockets.

---

### ✨ Funcionalidades Principais

-   **Autenticação de Usuários:** Sistema completo de registro e login com senhas criptografadas.
-   **Gerenciamento de Pedidos (CRUD):** Rotas para criar, ler, atualizar e deletar pedidos de ajuda.
-   **Autorização:** Apenas o autor de um pedido pode editá-lo ou deletá-lo.
-   **Tempo Real:** Utiliza Socket.IO para notificar todos os clientes conectados instantaneamente quando um novo pedido é criado.
-   **Segurança:** Rotas protegidas por middleware de autenticação para garantir que apenas usuários logados possam realizar ações.

---

### 🔧 Tecnologias Utilizadas

-   **Node.js:** Ambiente de execução JavaScript no servidor.
-   **Express.js:** Framework para a construção da API.
-   **MongoDB:** Banco de dados NoSQL para armazenar os dados.
-   **Mongoose:** ODM para modelar e interagir com o MongoDB.
-   **JSON Web Tokens (JWT):** Para autenticação segura e gerenciamento de sessões.
-   **Socket.IO:** Para comunicação em tempo real via WebSockets.
-   **Bcrypt.js:** Para criptografia de senhas.
-   **CORS:** Para permitir a comunicação com o frontend.

---

### ⚙️ Como Executar Localmente

1.  Clone o repositório.
2.  Instale as dependências: `npm install`
3.  Crie um cluster no MongoDB Atlas e obtenha sua string de conexão.
4.  Configure a variável de ambiente `MONGO_URL` com sua string.
5.  Inicie o servidor: `npm run dev`

O servidor estará rodando na porta 3333.