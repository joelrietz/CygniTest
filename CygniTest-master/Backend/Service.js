//Use resource to get and manipulate data in service file
const Resource = require('./resource');
const resource = new resource();
module.exports.service = class {

    constructor (name){
        this.thingy = name;
    }
    async getArtistName() {
        var artistName = await resource.getMbInfo();
        return artistName;
        console.log(artistName);
    }
    async getDescription(artistName){
        var description = await resource.getWikiInfo();
        return description;
    }
   /* async getAlbumCover() {
        var albumCover = await Resource.getCoverArtInfo();
        return albumCover;
    }*/
}