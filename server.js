// Import necessary modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  console.log('Request received for /');
  res.send('CBS Mule launching soon!');
});

// Set the port for the server to listen on
const port = 2000;

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});