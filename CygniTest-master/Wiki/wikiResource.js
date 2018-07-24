//Require axios to enable simple post and get requests
const axios = require("axios");
const wiki_url = ('https://en.wikipedia.org/w/api.php');

exports.wikiResource = class {

    constructor(){

    }

    async getAllDescriptions(){
        var description;
        await axios.get(wiki_url).then(response =>{
            description = response;
        })
        .catch((error) => {
            console.log('Error in getting the description for artis')
        });
        return description;
    }
}

