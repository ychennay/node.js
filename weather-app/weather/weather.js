const request = require('request');


var getWeather = (latitude, longitude, callback) =>{
var urlString = `https://api.darksky.net/forecast/c9fc4cfc9aa5d2e0861f69c5e3e1148e/${latitude},${longitude}`;
console.log(urlString);
request({url: urlString,
 json: true}, 
    (error, response, body) =>{
    if (error){
        callback("Can't do it, man.");
    } else if (response.statusCode == 404){
        callback("Not a valid request.");
    } else if (!error && response.statusCode == 200){
    callback(undefined, {
            timezone: body.timezone,
            temperature: body.currently.temperature,
            summary: body.currently.summary,
            nearestStormDistance: body.currently.nearestStormDistance,
            apparentTemperature: body.currently.apparentTemperature,
            precipProbability: body.currently.precipProbability}
        );
    }
});

};

module.exports.getWeather = getWeather;