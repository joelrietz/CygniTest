//Import and create objects for each service
var Service = require('./Backend/Service.js');
var service = new Service();
var Resource = require('./Backend/Resource.js');
var resource = new Resource();

async function run(message){
   console.log("Running Mashup");
   console.log(message);
   //Runs functions imported from Service.js
   try {
    
    var getArtistName = await service.getArtistName();
    console.log("getArtistName: " + getArtistName);

    const getDescription = await service.getDescription(getArtistName);
    console.log("getDescription: " + getDescription);
    //return getDescription;
 
    const getAlbumCover = await service.getAlbumCover();
    console.log("getAlbumCover: " + getAlbumCover);

    const getCoverArt = await service.getCoverArt()
    console.log("getImage: "+ getCoverArt);*/
       
   } catch (error) {
    console.log("Error in Mashup " + error);
    }
}   
module.exports.run = run;