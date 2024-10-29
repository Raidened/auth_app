import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const handleHttpError = (error) => {
    if (error.response) {
      // Récupérer le message d'erreur du serveur
      const message = error.response.data?.error || 'Une erreur est survenue';
      
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          throw new Error('Email ou mot de passe incorrect');
        case 404:
          throw new Error('Service non disponible');
        case 400:
          // Vérifier si l'erreur concerne un email déjà utilisé
          if (message.includes('email')) {
            throw new Error('Cette adresse email est déjà utilisée');
          } else if (message.includes('utilisateur')) {
            throw new Error('Ce nom d\'utilisateur est déjà utilisé');
          }
          throw new Error(message);
        case 500:
          throw new Error('Erreur serveur interne');
        default:
          throw new Error('Une erreur est survenue');
      }
    }
    throw new Error('Erreur de connexion au serveur');
  };
  

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response;
  } catch (error) {
    throw handleHttpError(error);
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password
    });
    return response;
  } catch (error) {
    throw handleHttpError(error);
  }
};
