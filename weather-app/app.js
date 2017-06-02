const yargs = require('yargs');
var express = require('express');
var passport = require('passport');
var express = require('express');
var googleMaps = require('./googlemaps/maps');
var altauth = require(__dirname + '/altauth');
const request = require('request');
const weather = require('./weather/weather');

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

app.use(router);

app.listen(3000);

console.log('Listening on 3000');

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
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
var latitude = 2;
var longitude = 2;
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
console.log("Hello " + latitude);

