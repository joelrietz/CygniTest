import { mbResource } from './mbResource';

//Use resource to get and manipulate data in service file
const {mbService} = require('./mbResource');
const mbService = new mbService();
exports.mbService = class {

    constructor (name){
        this.thingy.name;
    }

    async getArtists() {
        var artists = await mbResource.getAllArtists();
        return artists;
    }
}