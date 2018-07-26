//Importing relevant packages
var packages = require('/Users/jori/git/CygniTest-master/imports.js');

//Creating class named resource
module.exports.resource = class {
    constructor(name){
        this.thingy = name;
    }

//Function for getting the list of artists
async getMbInfo(){
    await packages.axios.get('http://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?&fmt=json&inc=url-rels+release-groups').then(function(response) {
        var mbJson = response.data.relations;
        var arr = [];
        for (var id in mbJson){
           var mbArr = arr.push(mbJson[id]["url"]["resource"]);
            if(mbArr = 'https://en.wikipedia.org/wiki/'){
                mbArr = arr[id-1];
            }
        }
        })
        .catch((error) => {
            console.log('Error' + error);
        });
        var bandName = packages.url.parse(mbArr).path.split("/")[2];
        console.log(bandName);
        return bandName;
    }

//Function for getting the artist description from wikipedia
async getWikiInfo(){
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=' + artistName;
    await packages.axios.get(wikiUrl).then(function(response){
        var wikiJson = response.data;
        for (var id in wikiJson){
            var wikiArr = arr.push(wikiJson[id]["extract"]);
        }
        console.log(wikiJson);
    })
    //TO DO, THIS IS WHERE I AM STUCK AT THE MOMENT
    //console.log(bandName);
        .catch((error) => {
        console.log('Error:' + error);
        });
    
    }
async getCoverArtInfo(){
    var coverArtUrl = 'http://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef'
    await packages.axios.get(coverArtUrl).then(function(response){
        var coverArtJson = response;
        console.log(coverArtJson);
    })
}
}