//Importing relevant packages
const axios = require('axios');
const url = require('url');
var prompt = require('prompt');
var converter = require('object-array-converter');
const mashup = require('/Users/jori/git/CygniTest-master/mashUp.js');
const express = require('express');
const app = express();


//Creating class named resource
module.exports = class {
    constructor (name){
        this.name = name;
    }
    /*async getMBID(message){
        var MBID;
        await prompt.start(message);
        prompt.get(['MBID']), function(err, result) {
            console.log("MBID input received");
            console.log(result.MBID);
            var MBID = result.MBID;
            return MBID;
        }
    
    }*/
//Function for getting the list of artists

    async getMbInfo(){
        const mbUrl = "http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups";
        try {
            await axios.get(mbUrl).then(function(response) {
                var mbJson = response.data.relations;
                //console.log(mbJson);
                var arr = [];
                var mbArr = [];
                //console.log(mbArr);
                //console.log(mbJson[7]);
            for (var id in mbJson){
                arr = mbJson[id]["url"]["resource"];
                if(arr.includes('https://en.wikipedia.org/wiki/')){
                    var bandName = url.parse(arr).path.split("/")[2];          
                }
            }
            console.log(bandName);
            return bandName;
        })
    }
    catch (error) {
        console.log("Error getMBInfo " + error);
    }
        
}

//Function for getting the artist description from wikipedia
    async getWikiInfo(){
    try{    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + artistName;
        await axios.get(wikiUrl).then(function(response){
            var wikiJson = response.data;
            for (var id in wikiJson){
                var wikiArr = arr.push(wikiJson[id]["extract"]);
            }
        console.log(wikiJson);
        })
    //TO DO, THIS IS WHERE I AM STUCK AT THE MOMENT
    //console.log(bandName);
    }
    catch (error) {
        console.log("Error getMbInfo " + error);
    }
    
    }
async getCoverArtInfo(){
    var coverArtUrl = 'http://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef'
    await axios.get(coverArtUrl).then(function(response){
        var coverArtJson = response;
        console.log(coverArtJson);
    })
}
}