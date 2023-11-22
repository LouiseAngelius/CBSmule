// app.js
const express = require('express');
const app = express();
const port = 2000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/chat.html', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.get('/events.html', (req, res) => {
  res.sendFile(__dirname + '/public/events.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});