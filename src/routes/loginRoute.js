// users.js
// npm i bcrypt
// npm i crypto

const express = require('express');
const router = express.Router();
const { executeSQL } = require('../db/executesql.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Function to generate a random initialization vector
const generateIV = () => {
  return crypto.randomBytes(16);
};

// Function to encrypt data using AES-GCM
const encryptData = (data, key, iv) => {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return { encryptedData, tag };
};

// Function to decrypt data using AES-GCM
const decryptData = (encryptedData, key, iv, tag) => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
};

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
  let query = `SELECT * FROM dbo.Users WHERE Username = '${username}'`;

  try {
    const response = await executeSQL(query);
    let user = response[0];

    if (user !== undefined) {
      const isPasswordMatch = await bcrypt.compare(password, user.Password);

      if (isPasswordMatch) {
        res.status(200).send({
          UserID: user.UserID,
          Username: user.Username,
          Email: user.Email, // Include email in the response
        });
      } else {
        res.status(400).send(req.body);
      }
    } else {
      res.status(400).send(req.body);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create user with symmetric encryption for phone number and email
router.post('/signup', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let phonenumber = req.body.phonenumber;
  let favoriteJuice = req.body.favoriteJuice;
  let favoriteCoffee = req.body.favoriteCoffee;
  let favoriteSandwich = req.body.favoriteSandwich;

  // Hash the password with a salt (using 2 rounds in this example)
  const saltRounds = 2;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate a random key for symmetric encryption
    const symmetricKey = crypto.randomBytes(32);

    // Generate a random initialization vector (IV)
    const iv = generateIV();

    // Encrypt phone number and email
    const encryptedPhoneNumber = encryptData(phonenumber, symmetricKey, iv);
    const encryptedEmail = encryptData(email, symmetricKey, iv);

    let query = `INSERT INTO dbo.Users (Username, Password, EncryptedEmail, EncryptedPhoneNumber, IV, FavoriteJuice, FavoriteCoffee, FavoriteSandwich) OUTPUT INSERTED.UserID VALUES ('${username}', '${hashedPassword}', '${encryptedEmail.encryptedData}', '${encryptedPhoneNumber.encryptedData}', '${iv.toString('hex')}', '${favoriteJuice}', '${favoriteCoffee}', '${favoriteSandwich}')`;

    const response = await executeSQL(query);
    const item = response[0];
    if (!!item && !!item.UserID) {
      res.status(200).send({
        UserID: item.UserID,
        Username: username,
        Password: hashedPassword,
        EncryptedEmail: encryptedEmail.encryptedData,
        EncryptedPhoneNumber: encryptedPhoneNumber.encryptedData,
        IV: iv.toString('hex'),
        FavoriteJuice: favoriteJuice,
        FavoriteCoffee: favoriteCoffee,
        FavoriteSandwich: favoriteSandwich,
      });
    } else {
      res.status(400).send("Error creating user information");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Check login
router.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = `SELECT * FROM dbo.Users WHERE Username = '${username}'`;

  try {
    const response = await executeSQL(query);
    let user = response[0];

    if (user !== undefined) {
      const isPasswordMatch = await bcrypt.compare(password, user.Password);

      if (isPasswordMatch) {
        res.status(200).send(user);
      } else {
        res.status(400).send(req.body);
      }
    } else {
      res.status(400).send(req.body);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;