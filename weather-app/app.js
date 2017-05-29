const request = require('request');
var constants = require('../playground/constants');
var express = require('express');
var passport = require('passport');
var express = require('express');
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

console.log(constants.googleMaps + "?address=10506%20eastborne%20avenue");
request({
    url: constants.googleMaps + "?address=10506%20eastborne%20avenue",
    json: true

}, (error, response, body) => {
    console.log(`House Number: ${body.results[0].address_components[0].long_name}`);
    console.log(`Address : ${body.results[0].address_components[1].long_name}`);
    console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

});

