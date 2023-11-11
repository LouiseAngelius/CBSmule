const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(3000, "0.0.0.0", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server open on http://${host}:${port}`);
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});