import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MediaCard from '../components/MediaCard';
import { searchMedia, getPopularMovies } from '../services/api';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentView, setCurrentView] = useState('popular'); // 'popular' ou 'search'

  const fetchPopular = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPopularMovies(page);
      // Adiciona 'media_type' manualmente para populares, pois a API /movie/popular não retorna
      const popularWithMediaType = response.data.results.map(item => ({ ...item, media_type: 'movie' }));
      setPopular(prev => page === 1 ? popularWithMediaType : [...prev, ...popularWithMediaType]);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
      setCurrentView('popular');
    } catch (err) {
      console.error("Erro ao buscar populares:", err);
      setError('Não foi possível carregar os filmes populares.');
      setPopular([]); // Limpa em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSearch = useCallback(async (query, page = 1) => {
     if (!query) { // Se a query for vazia, volta para populares
        setSearchTerm('');
        setResults([]);
        fetchPopular(1); // Carrega a primeira página de populares
        return;
     }
    setIsLoading(true);
    setError(null);
    setSearchTerm(query);
    try {
      const response = await searchMedia(query, page);
      // Filtra resultados que não são filmes ou séries
      const filteredResults = response.data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
      setResults(prev => page === 1 ? filteredResults : [...prev, ...filteredResults]);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
      setCurrentView('search');
    } catch (err) {
      console.error("Erro ao buscar:", err);
      setError('Não foi possível realizar a busca.');
      setResults([]); // Limpa em caso de erro
    } finally {
      setIsLoading(false);
    }
  }, [fetchPopular]);


  // Busca populares ao montar
  useEffect(() => {
    fetchPopular(1);
  }, [fetchPopular]);

  const handleSearch = (query) => {
    fetchSearch(query, 1); // Sempre busca a página 1 ao iniciar nova busca
  };

  const loadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      const nextPage = currentPage + 1;
      if (currentView === 'popular') {
        fetchPopular(nextPage);
      } else if (currentView === 'search') {
        fetchSearch(searchTerm, nextPage);
      }
    }
  };

  const itemsToDisplay = currentView === 'search' ? results : popular;
  const displayTitle = currentView === 'search' ? `Resultados para "${searchTerm}"` : "Filmes Populares";

  return (
    <div className="page-container home-container">
      {/* O título principal agora está no Header */}
      <SearchBar onSearch={handleSearch} />

      {error && <p className="error-message">{error}</p>}

       <h2>{displayTitle}</h2>
       {itemsToDisplay.length > 0 ? (
        <div className="media-grid">
          {itemsToDisplay.map(item => (
            // Adiciona verificação de ID para segurança
            item.id ? <MediaCard key={`${item.media_type}-${item.id}`} item={item} /> : null
          ))}
        </div>
      ) : (
         !isLoading && <p className="info-message">Nenhum resultado encontrado.</p>
      )}

      {isLoading && <p className="loading-message">Carregando...</p>}

      {!isLoading && currentPage < totalPages && itemsToDisplay.length > 0 && (
        <div className="load-more-container">
            <button onClick={loadMore} className="load-more-button">
            Carregar Mais
            </button>
        </div>
      )}
    </div>
  );
}

export default Home;