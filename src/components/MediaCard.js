import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getImageUrl } from '../services/api';
import './MediaCard.css';

// Placeholder pode ser um SVG ou um div estilizado para melhor performance
const placeholderImage = 'https://via.placeholder.com/500x750/CCCCCC/FFFFFF?text=Sem+Imagem';

function MediaCard({ item }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Garante mediaType (importante para busca 'multi')
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const itemId = item.id;

  // Ignora resultados que não sejam filmes ou séries, ou sem ID
  if (!itemId || (mediaType !== 'movie' && mediaType !== 'tv')) return null;

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? releaseDate.substring(0, 4) : 'Desconhecido';
  // Usa a função getImageUrl, que já trata path inexistente
  const posterUrl = getImageUrl(item.poster_path);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const itemDataForFavorite = {
      id: itemId,
      title: title,
      poster_path: item.poster_path,
      release_date: releaseDate,
      media_type: mediaType,
      vote_average: item.vote_average,
    };

    if (isFavorite(itemId, mediaType)) {
      removeFavorite(itemId, mediaType);
    } else {
      addFavorite(itemDataForFavorite);
    }
  };

  const isFav = isFavorite(itemId, mediaType);

  return (
    <Link to={`/${mediaType}/${itemId}`} className="media-card-link">
      <div className="media-card">
        <div className="media-card-poster-wrapper">
          {posterUrl ? (
             <img src={posterUrl} alt={`Poster de ${title}`} className="media-card-poster" loading="lazy" />
          ) : (
             <div className="media-card-placeholder">{title}</div>
          )}
           <button
            onClick={handleFavoriteClick}
            className={`favorite-button ${isFav ? 'favorited' : ''}`}
            aria-label={isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="media-card-info">
          <h3 className="media-card-title">{title} ({year})</h3>
          {item.vote_average > 0 && (
             <p className="media-card-rating">Nota: {item.vote_average.toFixed(1)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MediaCard;