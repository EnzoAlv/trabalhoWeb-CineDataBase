import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MediaCard from '../components/MediaCard';
import './FavoritesPage.css'; // Crie este CSS

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="page-container favorites-container">
      <h2>Meus Favoritos</h2>
      {favorites.length > 0 ? (
        <div className="media-grid">
          {favorites.map(item => (
             item.id ? <MediaCard key={`${item.media_type}-${item.id}`} item={item} /> : null
          ))}
        </div>
      ) : (
        <p className="info-message">Você ainda não adicionou nenhum filme ou série aos favoritos.</p>
      )}
    </div>
  );
}

export default FavoritesPage;