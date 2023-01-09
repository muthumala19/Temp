const express = require('express')
const bodyParser = require('body-parser');
const db = require("./models");

const app = express()
const port = 3000


app.use(bodyParser.json());

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const controller=require("./controller/user.controller");
app.get('/', (request, response) => {
    controller.authenticateUser(request.body,response);
    // response.send('login page')
})

app.post('/login', (request, response) => {
    console.log(request.body)
    response.send({ name:"user1", email:"AAAAAAAAAAAAAAAAA@gmail.com"})
})





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})