import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming the styles are in Register.css

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      alert('Connexion réussie');
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la connexion', err);
      alert('Échec de la connexion');
    }
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Se connecter</button>
      </form>
      <p className="auth-redirect">
        Pas encore inscrit ? <a href="/register">Cliquez ici</a>
      </p>
    </div>
  );
}

export default Login;
