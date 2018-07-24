//Use resource to get and manipulate data in service file
const {MbResource} = require('./mbResource.js');
const mbResrouce = new MbResource();
exports.MbService = class {

    constructor (name){
        this.thingy = name;
    }

    async getArtists() {
        var artists = await mbResource.getAllArtists();
        return artists;
    }
}