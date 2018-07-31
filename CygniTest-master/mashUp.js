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
var callback = require('callback')
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
        var mbUrl = "http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups";

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
                const wikiJson = response.data.query;
                const wikiArr = [];
                for(var id in wikiJson){
                    wikiArr[id] = wikiJson[id];
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
                console.log("ALBUMJSON: " + titleArr[0]);
                //console.log(idArr);
                console.log("idArr: " + mbUrl);
                var caaUrl = [];
                for(var id in idArr){
                    caaUrl = "http://coverartarchive.org/release-group/" + idArr[id];
                }
                console.log("CAAURL" + caaUrl[1]);
                
                axios.get(caaUrl).then(function(response){
                var imageJson = response.data.images;
                var imageArr = [];
                for(var id in imageJson){
                    imageArr[id] = imageJson[id]["image"];
                }
                var albumArr = [];
                for(var id in idArr){
                    albumArr[id] = titleArr[id]+idArr[id]+imageArr[id];
                }
                var json = JSON.stringify(albumArr);
                fs.writeFile('myjsonfile', json, 'utf8', callback);
                console.log("ALBUMARR " + albumArr[0]);
            })
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