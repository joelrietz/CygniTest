//Resource module where main the app's main functionality is located

//Importing relevant packages
var Service = require('/Users/jori/git/CygniTest-master/Backend/Service.js');
var service = new Service();
const axios = require('axios');
const url = require('url');
const mashup = require('/Users/jori/git/CygniTest-master/mashUp.js');
const express = require('express');
const app = express();

//Creating module named Resource.js
module.exports = class {
    constructor (name){
        this.name = name;
    }
//Function for getting the mbid from the server input
async getMBID() {
    var mbid = service.getMessage();
    return mbid; 
    }
//Function for getting the user input and obtaining the artist name from MusicBrainz 
async getMbInfo(){
    const mbUrl = "http://musicbrainz.org/ws/2/artist/"+message+"?&fmt=json&inc=url-rels+release-groups";
    try {
        await axios.get(mbUrl).then(function(response) {
            let mbJson = response.data.relations;
            let arr = [];
        for (var id in mbJson){
            arr = mbJson[id]["url"]["resource"];
            if(arr.includes('https://en.wikipedia.org/wiki/')){
                var bandName = url.parse(arr).path.split("/")[2];          
            }
        }
        return bandName;    
        })
    }
    catch (error) {
        console.log("Error getMBInfo " + error);
    }
    
    }

//Function for getting the artist description from Wikipedia
async getWikiInfo(bandName){
    try{
        const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + bandName;
        await axios.get(wikiUrl).then(function(response){
            var wikiJson = response.data.query;
            var wikiArr = [];
                for(var id in wikiJson){
                wikiArr[id] = wikiJson["pages"];
                }
            return wikiArr;
            })
        }
    catch (error) {
        console.log("Error getMbInfo " + error);
        }
}
    
//Function for getting the the album info from MusicBrainz
async albumInfo(mbid){
    try {
        var mbUrl = "http://musicbrainz.org/ws/2/artist/"+mbid+"?&fmt=json&inc=url-rels+release-groups";
        await axios.get(mbUrl).then(function(response) {
            var albumJson = response.data["release-groups"];
            var titleArr = [];
            var idArr = [];
            for(var id in albumJson){
                titleArr[id] = albumJson[id]["title"];
                idArr[id] = albumJson[id]["id"];
            }
            return idArr;
        })
    }
    catch (error) {
        console.log("Error albumInfo " + error);
    }
}
//Function for getting the Cover Art from Cover Art Archive
async getAlbumImage(idArr){
    try{
        for(var id in idArr){
        var caaUrl = "http://coverartarchive.org/release-group/"+idArr[id];
        await axios.get(caaUrl).then(function(response){
            var imageJson = response.data.images;
            var imageArr = [];
            for(var id in imageJson){
                imageArr[id] = imageJson[id]["image"];
            }
            return imageArr;
        })
    }
    }
    catch (error) {
        console.log("Error getAlbumImage " + error);   
        }
    }    
}
