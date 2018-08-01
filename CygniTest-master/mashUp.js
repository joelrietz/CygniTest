//Import and create objects for each service
var Service = require('./Backend/Service.js');
var service = new Service();
var Resource = require('./Backend/Resource.js');
var resource = new Resource();
const axios = require('axios');
const bandName = null;
var getArtistName = null;
const url = require('url');
var stringify = require('json-stable-stringify');
var fs = require('file-system');
var callback = require('callback');
const express = require('express');
const fetch = require('fetch');
const mash = express();
var toString = require('to-string');
var qs = require('qs');

async function run(message){
   console.log("Running Mashup");
   console.log(message);
   //Runs functions imported from Service.js
   try {
    //var getMBID = await service.getUserInput(message);
    
    /*var getArtistName = await service.getArtistName();
    console.log("getArtistName: " + getArtistName);

    const getDescription = await service.getDescription(getArtistName);
    console.log("getDescription: " + getDescription);
    //return getDescription;
 
    const getAlbumCover = await service.getAlbumCover();
    console.log("getAlbumCover: " + getAlbumCover);

    const getCoverArt = await service.getCoverArt()
    console.log("getImage: "+ getCoverArt);*/
        var mbUrl = "http://musicbrainz.org/ws/2/artist/"+message+"?&fmt=json&inc=url-rels+release-groups";

            await axios.get(mbUrl).then(function(response) {
                let mbJson = response.data.relations;
                //console.log(mbJson);
                let arr = [];
            for (var id in mbJson){
                arr = mbJson[id]["url"]["resource"];
                if(arr.includes('https://en.wikipedia.org/wiki/')){
                    var bandName = url.parse(arr).path.split("/")[2];          
                }
            }
            console.log(bandName);
                
    
   
            console.log("BAND NAME: " + bandName);
            const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + bandName;
            axios.get(wikiUrl).then(function(response){
                var wikiJson = response.data.query;
                var wikiArr = [];
                for(var id in wikiJson){
                    wikiArr[id] = wikiJson[id]["pages"];
                }
                console.log("Description: " + wikiArr);
                })
            });


            //TO DO, THIS IS WHERE I AM STUCK AT THE MOMENT
            //console.log(bandName);
            
    
        
    //Function for getting the artist description from wikipedia
            console.log("KEBABBABABB" + message);
            var mbUrl = "http://musicbrainz.org/ws/2/artist/"+ message + "?&fmt=json&inc=url-rels+release-groups";
            await axios.get(mbUrl).then(function(response) {
                var albumJson = response.data["release-groups"];
                var titleArr = [];
                var idArr = [];
                for(var id in albumJson){
                    titleArr[id] = albumJson[id]["title"];
                    idArr[id] = albumJson[id]["id"];
                }
    
                console.log("ALBUMJSON: " +titleArr);
                //console.log(idArr);
                console.log("idArr: " + idArr);
                var caaUrl = [];
                var caaUrlString = "";
                //var caaUrl = "http://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef"
                for(var id in idArr){
                    caaUrl[id] = "http://coverartarchive.org/release-group/" + idArr[id];
                    caaUrlString = toString(caaUrl[id]);
                    console.log("CAAAURLSTRING: " +caaUrlString);
                
                
                /*var caaJson = JSON.stringify(caaUrl);
                console.log("CAAAAAJSON: " +caaJson);
                var parseCaaJson = JSON.parse(caaJson);
                console.log("PARSED CAAJSON: "+parseCaaJson);
                fs.writeFile('mycaajson', json, 'utf8', callback);
                caaUrlString = toString(caaUrl[id]);
                caaUrlString = caaUrl[0];
                console.log("HRHIRHUROHJSTING: " + caaUrlString);
                JSON.stringify(caaUrl);
                console.log("CAAAREHIEUHRIUODSHRUIAHR " + caaUrl);*/
                var imageArr = [];
            
                axios.get(caaUrlString).then(function(response){
                    var imageJson = response.data["images"];
                    console.log("IMAGEJSON: " +imageJson);
                    for(var id in imageJson){
                        imageArr[id] = imageJson[id]["image"];
                        
                    }
                    console.log("IMAGEARR: " + imageArr[id]);
                })
            }
                    
                
               
                /*let promiseArr = caaUrl.map(l => fetch(l).then(res => res.json()));
                Promise.all(promiseArr).then(res => {
                    var imageJson = res;
                    console.log(imageJson);
                })*/
                var albumArr = [];
                for(var id in idArr){
                    albumArr[id] = "title: " + titleArr[id] + "id: "+idArr[id] + "image: "+imageArr[id];
                }
                var json = JSON.stringify(albumArr);
                console.log(json);
                fs.writeFile('myjsonfile', json, 'utf8', callback);
                
                console.log("ALBUMARR " + albumArr);
            
        });

        
    
   } catch (error) {
       console.log("Error in Mashup " + error);
   }
   
   //console.log(getMBID);
   //console.log(getArtistName);
   //console.log(getAlbumCover);
   //console.log(getDescription);

}

module.exports.run = run;