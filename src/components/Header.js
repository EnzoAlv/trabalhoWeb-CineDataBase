import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-title-link">
          <h1 className="header-title">CineInfo</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/favorites" className="nav-link">Favoritos</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;