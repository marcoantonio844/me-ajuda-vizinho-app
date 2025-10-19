# 🚀 Me Ajuda, Vizinho! (Frontend)

Este é o repositório do frontend para a aplicação "Me Ajuda, Vizinho!". A interface foi construída com React para ser moderna, reativa e proporcionar uma ótima experiência ao usuário.

**🔗 Link para o backend:** [Link para o seu repositório do backend no GitHub]

---

### ✨ Funcionalidades Implementadas

-   **Navegação e Rotas:** Sistema de páginas com React Router, incluindo rotas públicas (login/registro) e privadas (acessíveis apenas após o login).
-   **Autenticação Completa:** Telas e lógica para registro de novos usuários e login, com gerenciamento de sessão via Context API.
-   **Interface Reativa:** O estado da aplicação é gerenciado com os hooks do React (`useState`, `useEffect`), garantindo que a tela sempre reflita os dados mais recentes.
-   **CRUD de Pedidos:** Formulários e componentes para criar, visualizar, editar e deletar pedidos de ajuda.
-   **Notificações em Tempo Real:** Conecta-se ao backend via Socket.IO para receber e exibir novos pedidos instantaneamente, sem a necessidade de recarregar a página.
-   **Feedback ao Usuário:** Notificações "toast" elegantes para todas as ações (sucesso, erro, carregando) e indicadores de loading.

---

### 🔧 Tecnologias Utilizadas

-   **React:** Biblioteca para a construção da interface.
-   **Vite:** Ferramenta de build extremamente rápida para o ambiente de desenvolvimento.
-   **React Router DOM:** Para gerenciamento de rotas e navegação.
-   **Axios:** Para fazer as requisições HTTP para a API do backend.
-   **Socket.IO Client:** Para a comunicação em tempo real.
-   **React Hot Toast:** Para exibir notificações elegantes.
-   **Date-fns:** Para formatação de datas.
-   **CSS Modules:** Para estilização escopada e organizada.

---

### ⚙️ Como Executar Localmente

1.  Clone o repositório.
2.  Instale as dependências: `npm install`
3.  Certifique-se de que o backend esteja rodando.
4.  Inicie o servidor de desenvolvimento: `npm run dev`

A aplicação estará disponível em `http://localhost:5173`.