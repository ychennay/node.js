const Youtube = require("youtube-api");
const fs = require("fs");
const readJson = require('r-json');
const Lien = require("lien");
const Logger = require("bug-killer");
const opn = require("opn");
const prettyBytes = require("pretty-bytes");

const CREDENTIALS = readJson(`${__dirname}/credentials.json`);

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
                body: fs.createReadStream("video.mp4")
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