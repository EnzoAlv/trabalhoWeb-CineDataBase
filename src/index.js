import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais mais básicos
import App from './App';
import { FavoritesProvider } from './context/FavoritesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>
);