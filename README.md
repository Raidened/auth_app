# Application d'Authentification

Une application full-stack avec système d'authentification utilisant [React.js](https://reactjs.org/) pour le frontend et [Node.js] pour le backend.

## Technologies Utilisées

- Frontend: [React.js](https://reactjs.org/)
- Backend: [Node.js](https://nodejs.org/) avec [Express](https://expressjs.com/)
- Base de données: [MySQL](https://www.mysql.com/)
- Authentification: [JWT](https://jwt.io/) (JSON Web Tokens)
- Sécurité: [Bcrypt](https://www.npmjs.com/package/bcrypt) pour le hachage des mots de passe

## Configuration Requise

- [Node.js](https://nodejs.org/) (v12 ou supérieur)
- [MySQL Server](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

### Backend (./backend)

1. Installez les dépendances :
```bash
cd backend
npm install
```

2. Créez un fichier .env dans le dossier backend avec les variables suivantes :

PORT=5000
DB_HOST=localhost
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=votre_base_de_donnees
JWT_SECRET=votre_secret_jwt

3. Démarrez le serveur :

```bash
npm start
```
#### frontend (./frontend)

1. Installez les dépandancies :
```bash
cd frontend
npm install
```

2. Démarrez l'app :
```bash
npm start
```

##### Fonctionnalités :
- Inscription user
- Connexion user
- Protection des routes
- Gestion des sessions avec JWT
- Validation des formulaires
- Gestion des erreurs
- Interface utilisateur