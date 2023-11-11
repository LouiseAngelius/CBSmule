const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(3000, "64.227.71.105", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server open on http://${host}:${port}`);
});