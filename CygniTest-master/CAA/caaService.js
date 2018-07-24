//Use resource to get and manipulate data

const {CaaResource} = require('./caaResource');
const caaResource = new CaaResource();

//Create the class with functions that gets cover art
exports.CaaService = class {
    constructor(name){
        this.thingy = name;
    }

    async getCoverArt(){
        var coverArt = await caaResource.getCoverArt();
        return coverArt;
    }


}