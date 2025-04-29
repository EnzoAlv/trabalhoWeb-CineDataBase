import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('movieAppFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('movieAppFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    if (!favorites.some(fav => fav.id === item.id && fav.media_type === item.media_type)) {
      setFavorites(prevFavorites => [...prevFavorites, item]);
    }
  };

  const removeFavorite = (id, media_type) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(fav => !(fav.id === id && fav.media_type === media_type))
    );
  };

  const isFavorite = (id, media_type) => {
    return favorites.some(fav => fav.id === id && fav.media_type === media_type);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};