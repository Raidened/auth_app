const mysql = require('mysql2');

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Variables d\'environnement de base de données manquantes');
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
  
  // Création de la table users si elle n'existe pas
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE KEY email (email(100))
  )`;

    
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de la table users:', err);
      return;
    }
    console.log('Table users vérifiée/créée avec succès');
  });
});

module.exports = connection;
