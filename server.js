const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express()
const port = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: '12345678',
    database: 'bank',
});

app.use(bodyParser.json());

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
const db = require("./models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


app.get('/', (request, response) => {
    response.send('Hello World!')
})


app.post('/user', (request, response) => {
    console.log(request.body)
    response.send({ name:"user1", email:"AAAAAAAAAAAAAAAAA@gmail.com"})
})








app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})