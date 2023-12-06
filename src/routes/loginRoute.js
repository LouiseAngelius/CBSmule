// users.js
// npm i bcrypt, crypto, cors, express, tedious

const express = require('express');
const router = express.Router();
const { executeSQL } = require('../db/executesql.js');
const cors = require('cors');
const { TYPES } = require('tedious');
const bcrypt = require('bcrypt');

router.use(cors());

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
router.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = `SELECT * FROM dbo.Users WHERE UserName = @username`;

  try {
    // Retrieve user data from the database
    const userParams = [{ name: 'username', type: TYPES.VarChar, value: username }];
    const response = await executeSQL(query, userParams);
    const user = response[0];

    if (user) {
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(password, user.Password);

      if (passwordMatch) {
        res.status(200).send({
          UserID: user.UserID,
          Username: user.UserName,
          Email: user.Email,
          PhoneNumber: user.PhoneNumber,
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
router.post('/signup', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let favoriteJuice = req.body.favoriteJuice;
  let favoriteCoffee = req.body.favoriteCoffee;
  let favoriteSandwich = req.body.favoriteSandwich;

    try {
      // Hash password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user data into dbo.Users
      let userQuery = `
        INSERT INTO dbo.Users (UserName, Password, Email, PhoneNumber) 
        VALUES (@username, @password, @email, @phoneNumber);
      `;
  
      const userParams = [
        { name: 'username', type: TYPES.VarChar, value: username },
        { name: 'password', type: TYPES.VarChar, value: hashedPassword },
        { name: 'email', type: TYPES.VarChar, value: email },
        { name: 'phoneNumber', type: TYPES.VarChar, value: phoneNumber },
      ];
  
      // Execute the user insertion query
      await executeSQL(userQuery, userParams);
  
      // Retrieve the generated UserID
      let getUserIdQuery = `SELECT SCOPE_IDENTITY() AS UserID`;
      const result = await executeSQL(getUserIdQuery);
  
      if (result && result.length > 0 && result[0].UserID) {
        const UserID = result[0].UserID;
  
        // Insert favorite coffee, juice, and sandwich into dbo.Favorites
        let favoritesQuery = `
          INSERT INTO dbo.Favorites (Juice, Coffee, Sandwich) 
          VALUES (@favoriteJuice, @favoriteCoffee, @favoriteSandwich);
        `;
  
        const favoritesParams = [
          { name: 'favoriteJuice', type: TYPES.VarChar, value: favoriteJuice },
          { name: 'favoriteCoffee', type: TYPES.VarChar, value: favoriteCoffee },
          { name: 'favoriteSandwich', type: TYPES.VarChar, value: favoriteSandwich },
        ];
  
        // Execute the favorites insertion query
        await executeSQL(favoritesQuery, favoritesParams);
  
        // Retrieve the generated FavoritesID
        let getFavoritesIdQuery = `SELECT SCOPE_IDENTITY() AS FavoritesID`;
        const favoritesResult = await executeSQL(getFavoritesIdQuery);
  
        if (favoritesResult && favoritesResult.length > 0 && favoritesResult[0].FavoritesID) {
          const FavoritesID = favoritesResult[0].FavoritesID;
  
          // Insert UserID and FavoritesID into dbo.UserFavorites
          let userFavoritesQuery = `
            INSERT INTO dbo.UserFavorites (UserID, FavoritesID) 
            VALUES (@UserID, @FavoritesID);
          `;
  
          const userFavoritesParams = [
            { name: 'UserID', type: TYPES.Int, value: UserID },
            { name: 'FavoritesID', type: TYPES.Int, value: FavoritesID },
          ];
  
          // Execute the user favorites insertion query
          await executeSQL(userFavoritesQuery, userFavoritesParams);
  
          res.status(201).send({
            UserID,
            Username: username,
            Email: email,
            PhoneNumber: phoneNumber,
            FavoriteJuice: favoriteJuice,
            FavoriteCoffee: favoriteCoffee,
            FavoriteSandwich: favoriteSandwich,
          });
        } else {
          // Handle the case where FavoritesID is not available
          res.status(500).send("Error creating user: FavoritesID not available.");
        }
      } else {
        // Handle the case where UserID is not available
        res.status(500).send("Error creating user: UserID not available.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;