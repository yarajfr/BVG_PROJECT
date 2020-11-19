/*const http = require('http');

const server = http.createServer(function(request, response) {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8'});
    response.write('Hallo ');
    response.end('Projekte!!\n')


});


server.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});*/
const express = require('express');
const bvgRouter = require('./BVG/allRouter');
const persIdRouter = require('./BVG/persIdRouter');
const busdatenRouter = require('./BVG/busdatenRouter');


const app = express();

app.get('/', (req, res) => res.redirect('/all'));
app.use('/all', bvgRouter);

app.get('/', (req, res) => res.redirect('/personalId'));
app.use('/personalId', persIdRouter);

app.get('/', (req, res) => res.redirect('/busdaten'));
app.use('/busdaten', busdatenRouter);

app.listen(8080, () => {
    console.log('Server listening on port 8080  http://localhost:8080');
});

//MSQL Server Connection Check
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'elif',
    password: 'elif',
    database: 'BVG_Daten'

});

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');

});

