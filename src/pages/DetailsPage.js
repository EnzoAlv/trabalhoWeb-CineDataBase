import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getMediaDetails, getImageUrl } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import './DetailsPage.css';

const placeholderImage = 'https://via.placeholder.com/500x750/CCCCCC/FFFFFF?text=Sem+Imagem';

function DetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const mediaType = location.pathname.startsWith('/movie') ? 'movie' : 'tv';

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetails(null);
      window.scrollTo(0, 0); // Rola para o topo ao carregar detalhes

      try {
        const response = await getMediaDetails(mediaType, id); // Usa a função unificada
        setDetails(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
        setError(`Não foi possível carregar os detalhes.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  const findTrailer = () => {
    if (!details?.videos?.results) return null;
    const trailers = details.videos.results.filter(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
    );
    // Prioriza trailer oficial
    const officialTrailer = trailers.find(video => video.official === true);
    return officialTrailer || trailers[0]; // Retorna oficial ou o primeiro encontrado
  };

  const trailer = findTrailer();
  const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  const handleFavoriteClick = () => {
     if (!details) return;
     const itemDataForFavorite = {
      id: details.id,
      title: details.title || details.name,
      poster_path: details.poster_path,
      release_date: details.release_date || details.first_air_date,
      media_type: mediaType,
      vote_average: details.vote_average,
    };
    if (isFavorite(details.id, mediaType)) {
      removeFavorite(details.id, mediaType);
    } else {
      addFavorite(itemDataForFavorite);
    }
  };

  if (isLoading) return <div className="page-container"><p className="loading-message">Carregando detalhes...</p></div>;
  if (error) return <div className="page-container"><p className="error-message">{error}</p></div>;
  if (!details) return <div className="page-container"><p className="info-message">Detalhes não encontrados.</p></div>;

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'; // Extrai ano corretamente
  const posterUrl = getImageUrl(details.poster_path);
  const backdropUrl = getImageUrl(details.backdrop_path); // Para o fundo
  const isFav = isFavorite(details.id, mediaType);
  // Limita o elenco e trata caso não exista
  const cast = details.credits?.cast?.slice(0, 10).map(actor => actor.name).join(', ') || 'Não disponível';
  const genres = details.genres?.map(g => g.name).join(', ') || 'Não disponível';

  return (
    <div className="details-page" style={backdropUrl ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${getImageUrl(details.backdrop_path)})`} : {}}>
        <div className="details-page-container page-container">
        <Link to="/" className="back-link">← Voltar</Link>
        <div className="details-content">
            <div className="details-poster">
            {posterUrl ? (
                <img src={posterUrl} alt={`Poster de ${title}`} />
            ) : (
                <div className="details-placeholder-poster">{title}</div>
            )}
            </div>
            <div className="details-info">
            <h1>{title} ({year})</h1>
            {details.tagline && <p className="tagline"><em>"{details.tagline}"</em></p>}
            <div className="details-meta">
                <span><strong>Gêneros:</strong> {genres}</span>
                {details.runtime && <span><strong>Duração:</strong> {details.runtime} min</span>}
                {mediaType === 'tv' && details.number_of_seasons && (
                    <span><strong>Temporadas:</strong> {details.number_of_seasons}</span>
                )}
                {mediaType === 'tv' && details.number_of_episodes && (
                    <span><strong>Episódios:</strong> {details.number_of_episodes}</span>
                )}
                <span><strong>Nota:</strong> {details.vote_average ? details.vote_average.toFixed(1) : 'N/A'} ⭐</span>
            </div>

            <h3>Sinopse</h3>
            <p className="overview">{details.overview || 'Sinopse não disponível.'}</p>

            <h3>Elenco Principal</h3>
            <p className="cast">{cast}</p>

            <div className="details-buttons">
                {trailerUrl && (
                <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button trailer-button"
                >
                    Assistir Trailer
                </a>
                )}
                <button
                onClick={handleFavoriteClick}
                className={`action-button favorite-button-details ${isFav ? 'favorited' : ''}`}
                >
                {isFav ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default DetailsPage;