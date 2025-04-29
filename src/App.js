import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage'; // Importa a nova página
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="app-content"> {/* Usando <main> para conteúdo principal */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/tv/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} /> {/* Rota para favoritos */}
          {/* Adicionar rota para Not Found page se desejar */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      {/* Footer pode ser adicionado aqui se necessário */}
    </Router>
  );
}

export default App;