const yargs = require('yargs');
var express = require('express');
var passport = require('passport');
var express = require('express');
var googleMaps = require('./googlemaps/maps');
var altauth = require(__dirname + '/altauth');
var axios = require('axios');
var url = require('url');
var fs = require('fs');

const request = require('request');
const weather = require('./weather/weather');

const SERVER_PORT = '3000'
const BASE_URL = '127.0.0.1' + ':' + SERVER_PORT;

// Express app setup
var app = express();
var router = express.Router();

// This is the passport middlewae function that get called first
var auth = altauth.auth;

// Setup the route with basic authentication
router.get('/private',auth,function(req, res){
    console.log("call made to ");
    res.send('Access granted to private resource!!!')
});

router.get('/response',auth,function(req, res){
    console.log("received a call from Google ");
    var queryData = url.parse(req.url, true);
    var code = queryData.path.slice(15);
    console.log("Code is " + code);
});


app.listen(parseInt(SERVER_PORT));
console.log('Listening on 3000');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method} 
    request logged for ${BASE_URL}${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
            console.log('Unable to append text to server.log');
        }
    })
    next();
});
app.use(router);



const argv = yargs
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true 
            //always parse the address value as a string
        },
        l: {
            demand: false,
            alias: 'latlong',
            describe: 'Latitude and longitude of location to fetch weather for',
            string: true
        },
        o: {demand: false,
            alias: 'option',
            describe: 'Option to run either Axios or Request geocoding...',
            string: true}
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.o === 'normal' || argv.o === 'all'){
googleMaps.geocodeAddress(argv.address, (errorMessage, results) =>{
    if (errorMessage){
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) =>{
    if (errorMessage){
        console.log(errorMessage);
    } else{
        console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`It's currently ${weatherResults.temperature} degrees at ${results.address}.`);
    }
});
    }
});
}


if (argv.o === 'axios'){
console.log(`You selected the ${argv.o} options. ONLY Axios is being run!`);
var encodedURL = encodeURIComponent(argv.address);
console.log("Address: ", encodedURL);
var alternateEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`;

axios.get(alternateEndpoint)
  .then(function (response) {
      console.log("What address? ", alternateEndpoint);
      console.log("Success: ", response.data);
  //  console.log(response);
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
}
  
  console.log("Axios #2:");