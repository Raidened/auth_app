const mysql = require('mysql2');

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
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
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
