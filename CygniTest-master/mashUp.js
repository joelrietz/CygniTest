//Import and create objects for each service
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


   try {    // Calling the MusicBrainz API with an Axios get request basing the url on the user input and outputs the artist name
            var mbUrl = "http://musicbrainz.org/ws/2/artist/"+message+"?&fmt=json&inc=url-rels+release-groups";
            await axios.get(mbUrl).then(function(response) {
                let mbJson = response.data.relations;
                let arr = [];

                for (var id in mbJson){
                    arr = mbJson[id]["url"]["resource"];
                    if(arr.includes('https://en.wikipedia.org/wiki/')){
                    var bandName = url.parse(arr).path.split("/")[2];          
                }
            }
            // Calling the Wikipedia API with an Axios get request, basing the url on the artist name from above function
                var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + bandName;
                var extractor = new BodyExtractor ({
                url: wikiUrl
                });
                extractor.analyze()
                .then(function(text){
                    var description = extractor.mainText;
                    var descriptionJSON = '"' + "description" + '"' + description;
                    jsonfile.writeFile('artist_description', descriptionJSON,'utf8', callback); //Writes the artist description to a JSON file
                });
               
            });
            // Calling the MusicBrain API with an Axios get request, basing the url on the user input and outputs the album title and ID 
                var mbUrl = "http://musicbrainz.org/ws/2/artist/"+ message + "?&fmt=json&inc=url-rels+release-groups";
                axios.get(mbUrl).then(function(response) {
                var albumJson = response.data["release-groups"];
                var titleArr = [];
                var idArr = [];

                for(var id in albumJson){
                    titleArr[id] = albumJson[id]["title"];
                    idArr[id] = albumJson[id]["id"];
                }
                var caaUrl = [];
                var caaUrlString = "";
                var imageArr = [];

            // Calling the Cover Art Archive API with an Axios get request, basing the url on the album ID obtained from above function   
                for(var id in idArr){
                    caaUrl[id] = "http://coverartarchive.org/release-group/" + idArr[id];
                    caaUrlString = toString(caaUrl[id]);                
                    axios.get(caaUrlString).then(function(response){
                    var imageJson = response.data["images"];
                        for(var j in imageJson){
                            imageArr[j] = imageJson[j]["image"];
                        }
                        var albumArr = [];
                        var completeJson = [];
                        for(var i = 0; i <= imageArr.length; i++){
                            albumArr[i] = '"'+"title: "+'" '+ titleArr[i] +'" '+  "id: "+ '" ' +idArr[i] +'" '+ "image: "+'" '+ imageArr[i]+'" '; 
                        }
                        var descriptionJSON = fs.readJson('artist_description', function(err, packageObj){ //Reads artist description from stored JSON file
                            completeJson =  "mbid " + ":" + '"' + message + '" ' + "description: "  +'"'+packageObj+'"' + '"' + albumArr + '"'; //Concates the final JSON output
                            fs.outputJson('outputjson', completeJson, 'utf8', callback); //Outputs the complete JSON response to a JSON file 
                    }); 
                    
                })
                
            }
                
        });
    } catch (error) {
       console.log("Error in Mashup " + error);
   }
}

module.exports.run = run;