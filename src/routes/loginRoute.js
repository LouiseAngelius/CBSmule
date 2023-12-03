// users.js
// npm i bcrypt
// npm i crypto

const express = require('express');
const router = express.Router();
const { executeSQL } = require('../db/executesql.js');

router.get('/alive', async (req, res) => {
  res.send('Hello from users!');
});

// Find user data
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  let query = `SELECT * FROM dbo.Users WHERE UserID = ${id}`;
  try {
    const result = await executeSQL(query);
    let user = result[0];
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Check login
router.post('/login/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = `SELECT * FROM dbo.Users WHERE Username = '${username}'`;

  try {
    const response = await executeSQL(query);
    let user = response[0];

    if (user) {
      if (password === user.Password) {
        res.status(200).send({
          UserID: user.UserID,
          Username: user.Username,
          Email: user.Email, // Include email in the response
        });
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create user
router.post('/login/signup', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let favoriteJuice = req.body.favoriteJuice;
  let favoriteCoffee = req.body.favoriteCoffee;
  let favoriteSandwich = req.body.favoriteSandwich;

  let query = `INSERT INTO dbo.Users (Username, Password, Email, PhoneNumber, FavoriteJuice, FavoriteCoffee, FavoriteSandwich) 
               VALUES ('${username}', '${password}', '${email}', '${phoneNumber}', '${favoriteJuice}', '${favoriteCoffee}', '${favoriteSandwich}')`;

  try {
    console.log("Executing query:", query); // Log the SQL query
    const response = await executeSQL(query);
    const item = response[0];

    if (item && item.UserID) {
      res.status(201).send({
        UserID: item.UserID,
        Username: username,
        Email: email,
        PhoneNumber: phoneNumber,
        FavoriteJuice: favoriteJuice,
        FavoriteCoffee: favoriteCoffee,
        FavoriteSandwich: favoriteSandwich,
      });
    } else {
      console.error("Failed to create user:", response);
      res.status(500).send("Failed to create user");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send(error.message);
  }
});

module.exports = router;