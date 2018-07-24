//Use resource to get and manipulate data

const {caaResource} = require('./caaResource');
const caaResource = new caaResource();

//Create the class with functions that gets cover art
exports.caaService = class {
    constructor(name){
        this.thingy = name;
    }

    async getCoverArt(){
        var coverArt = await caaResource.getCoverArt();
        return coverArt;
    }

    
}