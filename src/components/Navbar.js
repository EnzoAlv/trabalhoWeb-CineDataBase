// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Meu App de Cinema
      </Link>
      {/* Pode adicionar outros links aqui, como Favoritos */}
      {/* <Link to="/favorites">Favoritos</Link> */}
    </nav>
  );
}

export default Navbar;