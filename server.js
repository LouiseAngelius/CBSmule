const express = require('express');
const path = require('path');
const app = express();
const port = 2000;

app.get('/', (req, res) => {
  console.log('Request received for /');
  res.send('CBS Mule launching soon!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});