import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import du fichier CSS

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert('Inscription réussie');
      navigate('/login');
    } catch (err) {
      console.error("Erreur lors de l'inscription", err);
      alert(err.message); // Affiche le message d'erreur spécifique
    }
  };
  

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p className="auth-redirect">
        Déjà inscrit ? <a href="/login">Cliquez ici</a>
      </p>
    </div>
  );
}

export default Register;
