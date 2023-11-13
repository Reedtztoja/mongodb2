const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const db = require('./db');

app.get('/', async (req, res) => {
    res.send("test");
})

app.get('/listAll', async (req, res) => {
    res.write("<h1>Lista wszystkich rekordow w bazie</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
})
app.post('/list', async (req, res) => {
    // console.log(req.body);
    // res.sendStatus(200);
    res.contentType('text/html');
    res.write("<h1>Lista wyszukanych rekordow wedlug kryteriow:</h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.get(client, req.body);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
})
app.post('/add', async (req, res) => {
    console.log(req.body)
    const client = await db.connect();
    db.add(client, req.body);
    res.sendStatus(200);
});

app.post('/delete', async (req, res) => {
    const client = await db.connect();
    let r = await db.delete_part(client, req.body.id);
    res.send(r);
})

app.listen(8000);