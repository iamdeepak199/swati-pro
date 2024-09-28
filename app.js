const express = require('express');
const chalk = require('chalk');
const mysql = require('mysql2');
const fs = require('fs');
const db = require('./config/database');
const path = require('path');
const app = express();

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files for CSS
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory manually (if it's not in the default location)
app.set('views', path.join(__dirname, 'views'));


// Handle the form submission for adding a lift
app.post('/add', (req, res) => {
  const { Unique_Id, Service_No, Rank, Name, Relation, Type_Of_Scholarship, Amount_Paid, Date_Of_Payment, Pv_No } = req.body;

  // Insert data into MySQL
  const sql = `INSERT INTO lifts (Unique_Id, Service_No, \`Rank\`, Name, Relation, Type_Of_Scholarship, Amount_Paid, Date_Of_Payment, Pv_No) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [Unique_Id, Service_No, Rank, Name, Relation, Type_Of_Scholarship, Amount_Paid, Date_Of_Payment, Pv_No], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.send('Lift added successfully');
  });
});

// GET route for the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle the request to fetch all lifts and render a view
app.get('/lifts', (req, res) => {
  const sql = `SELECT * FROM lifts`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Database error');
    }
    
    // Render the lifts data on a view (EJS or any templating engine)
    res.render('lifts', { lifts: results });  // 'lifts' is the name of the view template
  });
});

// Start the server
app.listen(3000, () => {
  console.log(chalk.green.bold.inverse('Server started on http://localhost:3000'));
});
