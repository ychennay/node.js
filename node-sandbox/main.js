var R = require('ramda');
const Youtube = require("youtube-api");
const Lien = require("lien");
const Logger = require("bug-killer");
const opn = require("opn");
//const fs = require("fs");
const prettyBytes = require("pretty-bytes");
//const CREDENTIALS = readJson(`${__dirname}/credentials.json`);
var square = function square (x) { return x * x; }  
var squares = R.chain(square, [1, 2, 3, 4, 5]); 
console.log("I'm also here!");
 document.getElementById('response').innerHTML = squares;

CREDENTIALS = {
    web:{
        client_id:"963238203692-0pccubr8mrr1quqpohnaa4lh0aa63bit.apps.googleusercontent.com",
        client_secret: "57ZFW_-9PJy6g8tz7uhKQrhf",
        redirect_uris:["http://127.0.0.1:3000/response"]
    }
}



// initialize Lien server
let server = new Lien({
    host: "localhost",
    port: 3000
});

let oauth = Youtube.authenticate({
    type: "oauth",
    client_id: CREDENTIALS.web.client_id,
    client_secret: CREDENTIALS.web.client_secret,
    redirect_url: CREDENTIALS.web.redirect_uris[0]
});

if (oauth){
    console.log("Oauth client created...");
}

opn(oauth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"]
}));

server.addPage("/response", lien => {
    Logger.log("Trying to get the token using the following code: " + lien.query.code);
    oauth.getToken(lien.query.code, (err, tokens) =>{

        if (err){
            lien.lien(err, 400);
            return Logger.log(err);
        }
        Logger.log("Got the tokens");
        Logger.log(tokens);
        oauth.setCredentials(tokens);
        lien.end("The video is being uploaded.");
        var req = Youtube.videos.insert({
            resource:{
                snippet:{
                    title: "TYu Chen Test Video Robot",
                    description: "testing the youtubes"
                },
                status: {privacyStatus: "public"}
            },
            part: "snippet, status",
            media: {
           //     body: fs.createReadStream("video.mp4")
            }
        },(err, data) => {
            console.log("Done.");
            process.exit();
        });
        setInterval(function(){
            Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
        }, 250);
    });
});


