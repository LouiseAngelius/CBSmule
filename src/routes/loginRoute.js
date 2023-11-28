const express = require('express');
const router = express.Router();
const { executeSQL } = require('../db/executesql.js');

router.get('/alive', async(req, res) => {
    res.send('Hello from users!');
});

//Finder brugerens data
router.get('/:id', async (req, res) => {
    const { id } = req.params;
     
      let query = `SELECT * FROM dbo.Users WHERE UserID = ${id}`;
      await executeSQL(query).then((result) => {
        let user = result["0"];
        res.status(200).send(user);
      });
    
});

//Tjekker login
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = `SELECT * FROM dbo.Users WHERE Username = '${username}'`;
    await executeSQL(query).then((response) => {
      let user = response["0"];
      if (user != undefined && user.Password == password) {
          res.status(200).send(user);
      } else {
          res.status(400).send(req.body);
      }
    }).catch((error) => {
      res.status(400).send(req.body);
    });
});

//Opret bruger
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let phonenumber = req.body.address;

    let query = `INSERT INTO dbo.Users (Username, Password, Email, Phonenumber) OUTPUT INSERTED.ID VALUES ('${username}', '${password}', '${email}');, '${phonenumber}'`;
    await executeSQL(query).then(response => {
      const item = response["0"];
      if (!!item && !!item.ID) {
        res.status(200).send({Id: item.ID, Username: username, Password: password, Email: email, Phonenumber: phonenumber});
      } else {
        res.status(400).send("Fejl under oprettelse af brugeroplysninger");
      }
    }).catch((error) => {
      res.status(400).send(req.body);
    })
   
});

module.exports = router;