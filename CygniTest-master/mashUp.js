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
 
    //var getAlbumCover = await service.getAlbumCover(getArtistName);
 
    //var getDescription = await service.getDescription();
   } catch (error) {
       console.log("Error " + error);
   }
   
   //console.log(getMBID);
   //console.log(getArtistName);
   //console.log(getAlbumCover);
   //console.log(getDescription);

}

module.exports.run = run;