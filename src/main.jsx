import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa o SEU App.jsx, que contém a TelaConsulta
import './index.css';

// Esta é a linha mais importante: ela renderiza seu componente App na página
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);