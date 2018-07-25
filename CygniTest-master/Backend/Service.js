//Use resource to get and manipulate data in service file
const {Resource} = require('./Resource');
const resource = new Resource();
exports.Service = class {

    constructor (name){
        this.thingy = name;
    }
    async getArtistName() {
        var artistName = await Resource.getMbInfo();
        return artistName;
        console.log(artistName);
    }
    async getDescription(){
        var description = await Resource.getWikiInfo();
        return description;
    }
    async getAlbumCover() {
        var albumCover = await Resource.getCoverArtInfo();
        return albumCover;
    }
}