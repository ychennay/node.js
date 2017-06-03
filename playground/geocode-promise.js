var geocodeAddress = require("../weather-app/googlemaps/maps").geocodeAddress;

var geocodePromise = (address) => {
    
    return new Promise((resolve, reject) =>{
        
       var locations = geocodeAddress(address, (errorMessage, location)=>{
            if (errorMessage){
                console.log("Something went wrong.");
        reject("Reject called.");
            } else{
                resolve(location);
            }
        });

    });
};

geocodePromise('10506 Eastborne Avenue').then((location) =>{
    console.log(location);
    }, 
    (promiseError)=>{console.log(promiseError)});