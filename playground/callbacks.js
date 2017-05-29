var constants = require("./constants");
console.log(constants.googleMaps);


var getRestaurant = (name, callback) =>{
    var restaurant = {
        name: name,
        fullname: name + " Smith"
    };
    setTimeout(() =>{
    callback(restaurant)}, 2000
    )};

getRestaurant("John", (callbackObject) => {

console.log(callbackObject);

});

const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/';