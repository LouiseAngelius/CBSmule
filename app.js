const express = require('express');
const app = express();
const port = 2000;
const cors = require('cors');
const path = require('path');

const http = require('http');
//const socketIo = require('socket.io');
//const server = http.createServer(app);
//const io = socketIo(server);

//io.on('connection', (socket) => {
  //  console.log('a user connected');
    
   // socket.on('disconnect', () => {
    //    console.log('user disconnected');
   // });

    //socket.on('chat message', (msg) => {
   //     io.emit('chat message', msg);
 //   });
//});

app.use(cors());
//app.use(express.static('public'));
app.use('/', express.static('public'));
app.use(express.json());

app.get('/alive', async (req, res) => {
  res.status(200).send('It is alive!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/styles.css'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/chat.html'));
});

app.get('/chat.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/scripts/chat.js'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/events.html'));
});

app.get('/events.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/scripts/events.js'));
});

app.get('/events/sms', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/scripts/events.js'));
});

app.get('/friends', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/friends.html'));
});

app.get('/friends.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/scripts/friends.js'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

/*app.post('/login/signup', (req, res) => {
  console.log('Received POST request for /login/signup');
  res.sendFile(path.join(__dirname, '/public/login.html'));
});*/

app.get('/login.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/scripts/login.js'));
});

app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/news.html'));
});

app.get('/pictures', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pictures.html'));
});

app.get('/pictures.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/scripts/pictures.js'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const loginRoute = require('./src/routes/loginRoute.js')

app.use("/login", loginRoute)

//Twilio herunder
const { MessagingResponse } = require('twilio').twiml;

// https://www.twilio.com/docs/messaging/tutorials/how-to-receive-and-reply/node-js
app.post('/events/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('CBSmule har modtaget din besked. Vi vender tilbage hurtigst muligt.');

  res.type('text/xml').send(twiml.toString());
});