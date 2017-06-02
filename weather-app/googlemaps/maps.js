const request = require('request');
var constants = require('../../playground/constants');

var geocodeAddress = (address, callback) =>{
    var encodedAddress = encodeURIComponent(address);
    console.log(constants.googleMaps + encodedAddress);
    request({
    url: constants.googleMaps + encodedAddress,
    json: true},
    
     (error, response, body) => {
    if(error){
        callback("Unable to connect to Google Maps API.")
    }
    else if (body.status === "ZERO_RESULTS"){
        callback("Unable to find any results.")
    }
    else if (body.status === "OK"){
        callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
        });
    }
    else{
        console.log("An error occured: " + body.status);
    }
    }
);
    
}


module.exports.geocodeAddress = geocodeAddress;
