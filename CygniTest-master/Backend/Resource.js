//Importing relevant packages
//var Service = require('/Users/jori/git/CygniTest-master/Backend/Service.js');
//var service = new Service();
const axios = require('axios');
const url = require('url');
const mashup = require('/Users/jori/git/CygniTest-master/mashUp.js');
const express = require('express');
const app = express();
var fs = require("fs");




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

    /*async getMBID() {
        var mbid = service.getMessage();
        console.log(mbid);
        return mbid; 
    }*/

    async getMbInfo(){
        const mbUrl = "http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups";
        try {
            await axios.get(mbUrl).then(function(response) {
                var mbJson = response.data.relations;
                var arr = [];
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
    try{
        var bandName ="Nirvana_(band)";
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + bandName;
        await axios.get(wikiUrl).then(function(response){
            var wikiJson = response.data.query;
            var content = fs.readFileSync(wikiJson);
            var jsonContent = JSON.parse(content);
            var wikiArr = [];
            for(var id in wikiJson){
            wikiArr[id] = wikiJson["pages"];
            }
        console.log(jsonContent);
        })
    //TO DO, THIS IS WHERE I AM STUCK AT THE MOMENT
    //console.log(bandName);
    }
    catch (error) {
        console.log("Error getMbInfo " + error);
    }
    
    }
async albumInfo(){
    try {
        var mbUrl = "http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups";
        await axios.get(mbUrl).then(function(response) {
            var albumJson = response.data["release-groups"];
            var titleArr = [];
            var idArr = [];
            for(var id in albumJson){
                titleArr[id] = albumJson[id]["title"];
                idArr[id] = albumJson[id]["id"];
            }
            //console.log(titleArr);
            //console.log(idArr);
            return idArr;
        })
    }
    catch (error) {
        console.log("Error albumInfo " + error);
    }
    }
async getAlbumImage(){
    try{
        var caaUrl = "http://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef";
        
        await axios.get(caaUrl).then(function(response){
            
            var imageJson = response.data.images;
            
            var imageArr = [];
           
            for(var id in imageJson){
                imageArr[id] = imageJson[id]["image"];
            }
            console.log(imageArr);
            return imageArr;
           
            
        })
        
    }
    catch (error) {
        console.log("Error getAlbumImage " + error);   
        }
    }    
}
