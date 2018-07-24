const {WikiService} = require('./Wiki/wikiService');
const wiki = new WikiService();
//Import and create objects for each service
const {MbService} = require('./MB/mbService');
const mb = new MbService();

const {CaaService} = require('./CAA/caaService');
const caa = new CaaService();

async function run(message){
    console.log("Running Mashup");
    console.log(message);


    const artist = ["Nirvana"];
    //Artist returns a map containing an artist name and corresponding MBID
    var mbMap = await MbService.getArtists();

    var caaMap = await CaaService.getCoverArt();

    var wikiMap = await WikiService.getDescription();

}

module.exports.run = run;