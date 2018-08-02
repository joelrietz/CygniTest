//Import and create objects for each service
var Service = require('./Backend/Service.js');
var service = new Service();
var Resource = require('./Backend/Resource.js');
var resource = new Resource();
const express = require('express');
const axios = require('axios');
const url = require('url');
var stringify = require('json-stable-stringify');
var fs = require('fs-extra');
var callback = require('callback');
var toString = require('to-string');
var BodyExtractor = require('extract-main-text');
var jsonfile = require('jsonfile');

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
            /*axios.get(wikiUrl).then(function(response){
                var wikiJson = response.data.query;
                var wikiArr = [];
                for(var id in wikiJson){
                    wikiArr[id] = wikiJson[id];
                    
                }
                    console.log("Description: " + wikiArr);
                })*/

                var extractor = new BodyExtractor ({
                    url: wikiUrl
                });
                extractor.analyze()
                .then(function(text){
                    var description = extractor.mainText;
                    var descriptionJSON = '"' + "description" + '"' + description;
                    var json = JSON.stringify(descriptionJSON);
                    jsonfile.writeFile('artist_description', json,'utf8', callback);
                    console.log("Description: " + description);
                });
               
    });
            //Function for getting the artist description from wikipedia
            var mbUrl = "http://musicbrainz.org/ws/2/artist/"+ message + "?&fmt=json&inc=url-rels+release-groups";
                axios.get(mbUrl).then(function(response) {
                var albumJson = response.data["release-groups"];
                var titleArr = [];
                var idArr = [];
                for(var id in albumJson){
                    titleArr[id] = albumJson[id]["title"];
                    idArr[id] = albumJson[id]["id"];
                }
    
                //console.log("ALBUMJSON: " +titleArr);
                //console.log(idArr);
                //console.log("idArr: " + idArr);
                var caaUrl = [];
                var caaUrlString = "";
                var imageArr = [];
                //var caaUrl = "http://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef"
                for(var id in idArr){
                    caaUrl[id] = "http://coverartarchive.org/release-group/" + idArr[id];
                    caaUrlString = toString(caaUrl[id]);                
                axios.get(caaUrlString).then(function(response){
                    var imageJson = response.data["images"];
                    
                    //console.log("IMAGEJSON: " +imageJson);
                    for(var j in imageJson){
                        imageArr[j] = imageJson[j]["image"];
                        var secondCounter = j++;
                    }
                    var albumArr = [];
                    var completeJson = [];
                    for(var i = 0; i <= imageArr.length; i++){
                    albumArr[i] = '"'+"title: "+'" '+ titleArr[i] +'" '+  "id: "+ '" ' +idArr[i] +'" '+ "image: "+'" '+ imageArr[i]+'" ';
                    }
                    var descriptionJSON = fs.readJson('artist_description', function(err, packageObj){
                        //console.log(packageObj);
                        completeJson =  "mbid " + ":" + '"' + message + '" ' + "description: "  +'"'+packageObj+'"' + '"' + albumArr + '"';
                        var json = JSON.stringify(completeJson);
                        fs.outputJson('outputjson', json, 'utf8', callback);
                    }); 
                    
                })
                
            }
                
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