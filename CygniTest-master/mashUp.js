//Import and create objects for each service
const Service = require('/Users/jori/git/CygniTest-master/Backend/Service.js');
const service = new service();

async function run(message){
   console.log("Running Mashup");
   console.log(message);

   const artist = ["Nirvana"];
   //Runs functions imported from Service.js
   var getArtistName = await service.getArtistName();

   var getAlbumCover = await service.getAlbumCover(artistName);

   //var getDescription = await Service.getDescription();

   console.log(getArtistName);
   console.log(getAlbumCover);
   console.log(getDescription);

}

module.exports.run = run;