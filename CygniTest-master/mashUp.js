//Import and create objects for each service
var Service = require('./Backend/Service.js');
var service = new Service();

async function run(message){
   console.log("Running Mashup");
   console.log(message);

   const artist = ["Nirvana"];
   //Runs functions imported from Service.js
   var getUserInput = await service.getUserInput();

   var getArtistName = await service.getArtistName(MBID);

   var getAlbumCover = await service.getAlbumCover(artistName);

   //var getDescription = await service.getDescription();
   console.log(getUserInput)
   console.log(getArtistName);
   console.log(getAlbumCover);
   console.log(getDescription);

}

module.exports.run = run;