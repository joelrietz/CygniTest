//Mashup module where all the functionality is tied together

//Import and create objects for each service
var Service = require('./Backend/Service.js');
var service = new Service();
var Resource = require('./Backend/Resource.js');
var resource = new Resource();
var fs = require('fs-extra');

async function run(message){
   console.log("Running Mashup");
   console.log(message);
   //Runs functions imported from Service.js
   try {
    //Function that provides the final call for the artist name sent to app.js
    var getArtistName = await service.getArtistName();
    console.log("getArtistName: " + getArtistName);

    //Function that provides the final call for the artist description sent to app.js
    const getDescription = await service.getDescription(getArtistName);
    console.log("getDescription: " + getDescription);

    //Function that provides the final call for the album title and ID sent to app.js
    const getAlbumCover = await service.getAlbumCover();
    console.log("getAlbumCover: " + getAlbumCover);

    //Function that provides the final call for the album cover art sent to app.js
    const getCoverArt = await service.getCoverArt()
    console.log("getImage: "+ getCoverArt);

    var albumArr = [];
    var completeJson = [];
    for(var i = 0; i <= imageArr.length; i++){
    albumArr[i] = '"'+"title: "+'" '+ titleArr[i] +'" '+  "id: "+ '" ' +idArr[i] +'" '+ "image: "+'" '+ imageArr[i]+'" '; 
    }
    var descriptionJSON = fs.readJson('artist_description', function(err, packageObj){ //Reads artist description from stored JSON file
        completeJson =  "mbid " + ":" + '"' + message + '" ' + "description: "  +'"'+packageObj+'"' + '"' + albumArr + '"'; //Concates the final JSON output
        fs.outputJson('outputjson', completeJson, 'utf8', callback); //Outputs the complete JSON response to a JSON file 
    }); 
       
   } catch (error) {
    console.log("Error in Mashup " + error);
    }
}   
module.exports.run = run;