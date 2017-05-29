const yargs = require('yargs');
var express = require('express');
var passport = require('passport');
var express = require('express');
var googleMaps = require('./googlemaps/maps');
var altauth = require(__dirname + '/altauth');

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
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true 
            //always parse the address value as a string
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

googleMaps.geocodeAddress(argv.address, (errorMessage, results) =>{
    if (errorMessage){
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});


