import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa o componente Raiz que contém o nosso Contexto de Autenticação
import Root from './Root.jsx';
// Importa o componente "guardião" que protege as rotas
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Importa todas as nossas páginas e o componente principal App
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MeusPedidosPage from './pages/MeusPedidosPage.jsx'; // Garante que a importação está aqui

import './index.css';

// Estrutura de rotas corrigida e final
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // O elemento Raiz envolve toda a aplicação
    children: [
      // Rotas públicas que não precisam de login
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      // Agrupamento de rotas que SÃO protegidas pelo login
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/', // A página principal com todos os pedidos
            element: <App />,
          },
          {
            path: 'meus-pedidos', // A nova página de perfil
            element: <MeusPedidosPage />,
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);