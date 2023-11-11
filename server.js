const express = require('express');
const path = require('path');

const app = express();
const port = 2000;

// Serve static files from the same directory
app.use(express.static(__dirname));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});