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
  let juice = req.body.juice;
  let coffee = req.body.coffee;
  let sandwich = req.body.sandwich;

    try {
      // Hash password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user data into dbo.Users
      let userQuery = `INSERT INTO dbo.Users (UserName, Password, Email, PhoneNumber, Juice, Coffee, Sandwich) 
      VALUES (@username, @password, @email, @phoneNumber, @juice, @coffee, @sandwich);`;
  
      const userParams = [
        { name: 'username', type: TYPES.VarChar, value: username },
        { name: 'password', type: TYPES.VarChar, value: hashedPassword },
        { name: 'email', type: TYPES.VarChar, value: email },
        { name: 'phoneNumber', type: TYPES.VarChar, value: phoneNumber },
        { name: 'juice', type: TYPES.VarChar, value: juice },
        { name: 'coffee', type: TYPES.VarChar, value: coffee },
        { name: 'sandwich', type: TYPES.VarChar, value: sandwich },
      ];
  
      // Execute the user insertion query
      await executeSQL(userQuery, userParams);

          res.status(201).send({
            UserID,
            Username: username,
            Email: email,
            PhoneNumber: phoneNumber,
            juice: juice,
            coffee: coffee,
            sandwich: sandwich,
          });

    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;