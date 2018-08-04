const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mashup = require('./mashUp.js');
var stringify = require('json-stable-stringify');
//var mbURL = 'http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt =json&inc=url-rels+release-groups';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Frontend part of application
app.use(express.static(__dirname + '/public'));

app.post('/run', (req, res) => {
    mashup.run(req.body.message);
    res.sendFile(__dirname + '/outputjson', {headers: {'Content-Type': 'text/json'}}); //Outputs the final JSON file to the server
    });

app.listen(80, () => console.log("The API is up and running!"))
