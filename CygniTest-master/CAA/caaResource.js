const axios = require("axios");
const caa_url =  'http://coverartarchive.org/release';

exports.CaaResource = class {
    constructor(name){
        this.thingy = name;
    }

    async getAllCoverArt(){
        var coverArt;
        await axios.get(caa_url).then(response =>{
            coverArt = response;
        })
    .catch((error) => {
        console.log('Error in getting the cover art for album');

    });

    return coverArt;
    }
}
