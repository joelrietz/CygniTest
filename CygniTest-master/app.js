'use strict';
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
    console.log(req.body.message);
    res.send("Whoop whoop!");

});
//These functions are only here temporarily due to some structural problems, will be removed and only present in Resources
 /*   axios.get('http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups').then(function(response) {
    var mbJson = response.data.relations;
    var arr = [];
    var mbArr;
    for (var id in mbJson){
       mbArr = arr.push(mbJson[id]["url"]["resource"]);
        if(mbArr = 'https://en.wikipedia.org/wiki/'){
            mbArr = arr[id-1];
        }
    }

    var bandName = url.parse(mbArr).path.split("/")[2];
})
//Getting info from wikipedia
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + bandName;
    axios.get(wikiUrl).then(function(response){
    var wikiJson = response.data;
    for (var id in wikiJson){
        var wikiArr = arr.push(wikiJson[id]["extract"]);
        }
        console.log(wikiJson);
    })
//TO DO, THIS IS WHERE I AM STUCK AT THE MOMENT
    //console.log(bandName);
  .catch((error) => {
      console.log('Error:' + error);
  });
//Getting cover Art 
    var coverArtUrl = 'http://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef'
    axios.get(coverArtUrl).then(function(response){
        var coverArtJson = response;
        console.log(coverArtJson);
    })
*/
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(8082, () => console.log("The API is up and running!"))
