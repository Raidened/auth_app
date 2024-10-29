// app.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const db = require('./db');  
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser le JSON




// Route d'inscription
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

// Route de connexion
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Vérifie que tous les champs sont fournis
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    // Recherche l'utilisateur dans la base de données
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion:', err);
            return res.status(500).json({ error: 'Erreur lors de la connexion' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        const user = results[0];

        // Vérifie le mot de passe
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Génère un token JWT
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Envoie la réponse
        res.json({
            token,
            username: user.username
        });
    });
});

// Gérer les exceptions/erreurs
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
