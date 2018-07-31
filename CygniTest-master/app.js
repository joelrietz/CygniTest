const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mashup = require('./mashUp.js');
const axios = require('axios');
const url = require('url');
//var mbURL = 'http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt =json&inc=url-rels+release-groups';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Frontend part of application
app.use(express.static(__dirname + '/public'));

app.post('/run', (req, res) => {
    mashup.run(req.body.message);
    res.send("Whoop whoop!");
    res.send(myjsonfile);
    });

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
    res.sendFile(__dirname + 'public/myjsonfile');
})
app.listen(8082, () => console.log("The API is up and running!"))
