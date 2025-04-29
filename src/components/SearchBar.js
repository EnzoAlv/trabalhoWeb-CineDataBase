import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    } else {
        onSearch(''); // Permite limpar a busca enviando string vazia
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filmes ou séries..."
        className="search-input"
        aria-label="Campo de busca de filmes ou séries"
      />
      <button type="submit" className="search-button">Buscar</button>
    </form>
  );
}

export default SearchBar;