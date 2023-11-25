const express = require('express');
const app = express();
const port = 2000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.get('/events', (req, res) => {
  res.sendFile(__dirname + '/public/events.html');
});

app.get('/friends', (req, res) => {
  res.sendFile(__dirname + '/public/friends.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/news', (req, res) => {
  res.sendFile(__dirname + '/public/news.html');
});

app.get('/pictures', (req, res) => {
  res.sendFile(__dirname + '/public/pictures.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const authenticate = require("./src/routes/authenticateRoute.js")

app.use("/auth", authenticate)