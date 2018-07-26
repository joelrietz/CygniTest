// Read name of host in .env file 
//require('dotenv').config();
module.exports =  {
axios: require('axios'),
// Setup application
mashup: require('./mashUp.js'),
bodyParser: require('body-parser'),
express: require('express'),
app: express(),
url: require('url'),
rp: require('request-promise'),
cheerio: require('cheerio'),
fs: require('fs'),
request: require('request')
}

