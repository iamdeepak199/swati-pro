const chalk = require('chalk');
const mysql = require('mysql2');

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',                          //password
    database: 'liftdb'
  });
  
  // Check MySQL connection
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log(chalk.blue.italic.inverse('Connected to the MySQL database.'));
  });

  module.exports = db ;