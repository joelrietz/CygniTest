const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mashup = require('./mashUp.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Frontend part of application
app.use(express.static(__dirname + '/public'));

app.post('/run', (req, res) => {
    mashup.run(req.body.message);
    res.sendFile(__dirname + '/outputjson', {headers: {'Content-Type': 'text/json'}});
    });

app.listen(8082, () => console.log("The API is up and running!"))
