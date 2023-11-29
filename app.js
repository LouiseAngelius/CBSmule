const express = require('express');
const app = express();
const port = 2000;
const cors = require('cors');
// path modul, så path join

app.use(cors());
//app.use(express.static('public'));
app.use('/', express.static('public'));
app.use(express.json());

app.get('/alive', async (req, res) => {
  res.status(200).send('It is alive!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/style.css'));
});

//app.get('/', (reqa, res) => {
//  res.sendFile(__dirname + '/public/style.css');
//});

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

const loginRoute = require('./src/routes/loginRoute.js')

app.use("/login", loginRoute)

app.use("/signup", loginRoute)