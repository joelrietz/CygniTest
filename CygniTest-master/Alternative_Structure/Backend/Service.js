//Use resource to get and manipulate data in Service.js module
var Resource = require('/Users/jori/git/CygniTest-master/Backend/Resource.js');
var resource = new resource();
var Mashup = require('/Users/jori/git/CygniTest-master/mashUp.js');
var mashup = new mashup();

//Creating a module called Service.js
module.exports = class {
    constructor(name){
        this.thingy = name;
    }
    //Function that obtains the user input from mashup module
    async getMessage() {
        var mbid = await mashup.run(message);
        return message;
        }
    //Function that obtains the artist name from the resource module
    async getArtistName() {
        var artistName = await resource.getMbInfo();
        return artistName;
    }
    //Function that obtains the artist description from the resource module
    async getDescription(bandName){
        var description = await resource.getWikiInfo();
        return description;
    }
   //Function that obtains the album info from the resource module
   async getAlbumCover() {
        var albumInfo = await resource.albumInfo();
        return albumInfo;
    }
    //Function that obtains the cover art from the resource module
    async getCoverArt() {
        var coverArt = await resource.getAlbumImage();
        return coverArt;
    } 
    
}