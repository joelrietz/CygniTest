const axios = require("axios");
const mb_url = 'https://musicbrainz.org/ws/2/artist?';
const recordingString = 'inc=recordings';

exports.MbResource = class {
    constructor(name){
        this.thingy = name;
    }

async getAllArtists(){
    var artistName;
    var artist;
    var artistMBID
    var map = new Map();
    await axios.get(mb_url, config).then(response => {
        var sizeArtistList = (response.artist).length;
        for(var i = 0; i <= sizeOfusers; i++){
            var artistName = response.artist[i];
            if (artist == artistName){
                map.set(artist, artistMBID);
            }    
        }
  })
  .catch((error) => {
      console.log('Error:' + error);
  });

  return map;
    }
}