//Use resource to get and manipulate data in service file
var Resource = require('/Users/jori/git/CygniTest-master/Backend/Resource.js');
var resource = new Resource();
module.exports.Service = class {
    constructor (name){
        this.thingy = name;
    }
    async getUserInput() {
        var userInput = await resource.getMBID();
        return MBID;
        console.log(MBID);
    }

    async getArtistName(MBID) {
        var artistName = await resource.getMbInfo(MBID);
        return artistName;
        console.log(artistName);
    }
    async getDescription(artistName){
        var description = await resource.getWikiInfo(artistName);
        console.log(description);
        return description;
    }
   /* async getAlbumCover() {
        var albumCover = await Resource.getCoverArtInfo();
        return albumCover;
    }*/
}