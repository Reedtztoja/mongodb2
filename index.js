const express = require('express');
const app = express();
const db = require('./db');

app.get('/', async (req, res) => {
    res.send("test");
})

app.get('/listAll', async (req, res) => {
    res.write("<h1>Lista wszystkich rekordow w bazie</h1>");
    const client = await db.connect();
    res.end();
})

app.listen(8000);