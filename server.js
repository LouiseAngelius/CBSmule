// Import necessary modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Serve static files from the same directory as server.js
app.use(express.static(__dirname));

// Define a route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Set the port for the server to listen on
const port = 2000;

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});