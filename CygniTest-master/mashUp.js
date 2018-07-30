//Import and create objects for each service
var Service = require('./Backend/Service.js');
var service = new Service();

async function run(message){
   console.log("Running Mashup");
   console.log(message);
   //Runs functions imported from Service.js
   try {
    //var getMBID = await service.getUserInput(message);

    var getArtistName = await service.getArtistName();
    console.log("getArtistName: " + getArtistName);
 
    var getAlbumCover = await service.getAlbumInfo();
    console.log("getAlbumCover: " + getAlbumCover);

    var getImage = await service.getCoverArt()
    console.log("getImage: "+ getImage);
    
    var getDescription = await service.getDescription();
    console.log("getDescription: " + getDescription);
   } catch (error) {
       console.log("Error in Mashup " + error);
   }
   
   //console.log(getMBID);
   //console.log(getArtistName);
   //console.log(getAlbumCover);
   //console.log(getDescription);

}

module.exports.run = run;