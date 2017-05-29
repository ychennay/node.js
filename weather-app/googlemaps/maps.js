console.log(constants.googleMaps + "?address=10506%20eastborne%20avenue");
request({
    url: constants.googleMaps + "?address=10506%20eastborne%20avenue",
    json: true

}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
});