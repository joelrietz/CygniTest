//Use resource to get and manipulate data in service file
var Resource = require('/Users/jori/git/CygniTest-master/Backend/Resource.js');
var resource = new Resource();
//var Mashup = require('/Users/jori/git/CygniTest-master/mashUp.js');
//var mashup = new mashup();
module.exports = class {
    constructor(name){
        this.thingy = name;
    }
    /*async getUserInput(message) {
        var MBID = await resource.getMBID(message);
        return MBID;
        console.log(MBID);
    }*/

    /*async getMessage() {
        var mbid = await mashup.run(message);
        return message;
        }*/

    async getArtistName() {
        var artistName = await resource.getMbInfo();
        console.log("getArtistName " + artistName);
        return artistName;
    }
    async getDescription(bandName){
        var description = await resource.getWikiInfo();
        console.log("getDescription " +description);
        return description;
    }
   async getAlbumInfo() {
        var albumInfo = await resource.albumInfo();
        console.log("getAlbumInfo " +albumInfo);
        return albumInfo;
    }
    async getCoverArt() {
        var coverArt = await resource.getAlbumImage();
        console.log("getCoverArt " +coverArt);
        return coverArt;
    } 
    
}