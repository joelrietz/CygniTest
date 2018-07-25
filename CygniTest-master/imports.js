// Read name of host in .env file 
//require('dotenv').config();
const axios = require('axios');
// Setup application
const mashup = require('./mashUp.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const url = require('url');
const rp = require('request-promise');
const cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');