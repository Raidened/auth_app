// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour accéder à cette page.');
      navigate('/login');
    } else {
      // Récupérer le nom d'utilisateur depuis localStorage s'il existe
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Amogus</div>
        <nav className="nav-user">
          <span className="username">{username}</span>
          <button onClick={handleLogout} className="logout-icon" title="Se déconnecter">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1>Bienvenue sur la page d'accueil</h1>
        <p>Contenu réservé aux utilisateurs connectés.</p>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Amogus. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Home;
