//Importing relevant packages
//var Service = require('/Users/jori/git/CygniTest-master/Backend/Service.js');
//var service = new Service();
const axios = require('axios');
const url = require('url');
const mashup = require('/Users/jori/git/CygniTest-master/mashUp.js');
const express = require('express');
const app = express();
var bandName = null;
const cb = require('callback')




//Creating class named resource
module.exports = class {
    constructor (name){
        this.name = name;
    }
//Function for getting the mbid from the server input
async getMBID() {
            var mbid = service.getMessage();
            console.log(mbid);
            return mbid; 
    }

async getMbInfo(){
    const mbUrl = "http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups";
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
        console.log("BAND NAME: " + bandName);
        return bandName;    
        })
    }
    catch (error) {
        console.log("Error getMBInfo " + error);
    }
    
    }

//Function for getting the artist description from wikipedia
async getWikiInfo(bandName){
        try{
            console.log(bandName);
            const bandName ="Nirvana_(band)";
            const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + bandName;
            await axios.get(wikiUrl).then(function(response){
                const wikiJson = response.data.query;
                const wikiArr = [];
                for(var id in wikiJson){
                wikiArr[id] = wikiJson["pages"];
                }
            console.log(wikiArr);
            return wikiArr;
            })
        }
        catch (error) {
            console.log("Error getMbInfo " + error);
        }
}
    
//Function for getting the the album info from MusicBrainz
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
