// app.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser le JSON

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Routes
app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // Vérifie que tous les champs sont fournis
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
      }
  
      // Validation du format email avec une regex
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Format d\'email invalide.' });
      }
    // Vérifie si le nom d'utilisateur ou l'email existe déjà
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
      if (err) {
        console.error('Erreur lors de la vérification:', err);
        return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
      }

      const usernameTaken = results.find(user => user.username === username);
      const emailTaken = results.find(user => user.email === email);

      if (usernameTaken) {
        return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà utilisé.' });
      }

      if (emailTaken) {
        return res.status(400).json({ error: 'Cette adresse email est déjà utilisée ou est incorrecte.' });
      }

      // Si ni le nom d'utilisateur ni l'email n'existent, procéder à l'inscription
      const hashedPassword = bcrypt.hashSync(password, 10);
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      
      db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'inscription :', err);
          return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
      });
    });
});

// Gérer les exceptions/erreur/ 401 404 etc
app.use((req, res, next) => {
    res.status(404).json({ 
      status: 404,
      message: "Route non trouvée"
    });
});
  
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Erreur serveur interne";
    
    res.status(status).json({
      status: status,
      message: message
    });
});
  
// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
