const express = require('express');
const app = express();
const path = require('path');

const port = 2000;

app.get('/', (req, res) => {
  res.send('CBS Mule launching soon!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});