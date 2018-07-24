import { wikiService } from './Wiki/wikiService';

//Import and create objects for each service
const {mbService} = require('./MB/mbService');
const mb = new mbService();

const {caaService} = require('./CAA/caaService');
const caa = new caaService();

async function run(message){
    console.log("Running Mashup");
    console.log(message);


    const artist = ["Nirvana"];
    //Artist returns a map containing an artist name and corresponding MBID
    var mbMap = await mbService.getArtists();

    var caaMap = await caaService.getCoverArt();

    var wikiMap = await wikiService.getDescription();

}

module.exports.run = run;