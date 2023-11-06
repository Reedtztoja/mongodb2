const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    res.send("test");
})

app.get('/listAll', async (req, res) => {
    res.write("<h1>Lista wszystkich rekordow w bazie</h1>");
    res.end();
})

app.listen(8000);