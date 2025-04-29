import axios from 'axios';

const API_KEY = 'cc2476896a67489fd1e502db5640f854'; // Sua Chave da API
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL para imagens (tamanho w500)
const LANGUAGE = 'pt-BR'; // Definindo o idioma padrão

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : null; // Retorna null se não houver path
};

export const searchMedia = (query, page = 1) => {
  return api.get('/search/multi', {
    params: {
      query: query,
      page: page,
      include_adult: false, // Adicionado para filtrar conteúdo adulto
    },
  });
};

export const getPopularMovies = (page = 1) => {
  return api.get('/movie/popular', {
    params: {
      page: page,
    },
  });
};

export const getMovieDetails = (id, options = {}) => {
  return api.get(`/movie/${id}`, options); // Options pode incluir append_to_response
};

export const getTvDetails = (id, options = {}) => {
  return api.get(`/tv/${id}`, options); // Options pode incluir append_to_response
};

// Função para buscar detalhes de um filme OU série (unificada para simplificar)
export const getMediaDetails = (mediaType, id) => {
    const fetchFunction = mediaType === 'movie' ? getMovieDetails : getTvDetails;
    return fetchFunction(id, { params: { append_to_response: 'videos,credits' } });
};

export default api;