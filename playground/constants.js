function define(name, value){
    Object.defineProperty(exports, name,
    {value: value,
    enumerable: true});
}

define("googleMaps", 'https://maps.googleapis.com/maps/api/geocode/json?address=');
