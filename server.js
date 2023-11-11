// Import necessary modules
const express = require('express');

// Create an Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Set the port for the server to listen on
const port = 4700;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});