//Use resource to get and manipulate data

const {wikiResource} = require('./wikiResource');
const wikiResource = new wikiResource();

//Create the wikiService class to handle functions and data from wikiResource
exports.wikiService = class {
    constructor(name){
        this.thingy = name;
    }
    async getDescription(){
        var description = await wikiResource.getAllDescriptions();
        return description;
    }
}