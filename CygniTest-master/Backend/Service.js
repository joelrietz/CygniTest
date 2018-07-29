//Use resource to get and manipulate data in service file
var Resource = require('/Users/jori/git/CygniTest-master/Backend/Resource.js');
var resource = new Resource();
module.exports = class {
    constructor (name){
        this.thingy = name;
    }
    /*async getUserInput(message) {
        var MBID = await resource.getMBID(message);
        return MBID;
        console.log(MBID);
    }*/

    async getArtistName() {
        var artistName = await resource.getMbInfo();
        return artistName;
        console.log(artistName);
    }
    async getDescription(bandName){
        var description = await resource.getWikiInfo(artistName);
        console.log(description);
        return description;
    }
   async getAlbumCover() {
        var albumCover = await resource.getCoverArtInfo();
        return albumCover;
    }
}