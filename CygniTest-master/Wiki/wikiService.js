//Use resource to get and manipulate data
const {WikiResource} = require('./wikiResource');
const wikiResource = new WikiResource();

//Create the wikiService class to handle functions and data from wikiResource
exports.WikiService = class {
    constructor(name){
        this.thingy = name;
    }
    async getDescription(){
        var description = await wikiResource.getAllDescriptions();
        return description;
    }
}