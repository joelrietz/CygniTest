'use strict';

const mashup = require('./mashUp.js');
const bodyParser = require('body-parser');
// Setup application
const express = require('express')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Frontend part of application
app.use(express.static(__dirname + '/public'));

app.post('/run', (req, res) => {
    mashup.run(req.body.message);
    res.send("Whoop whoop!");

});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/pubic/index.html');
})

app.listen(8081, () => console.log("The API is up and running!"))
