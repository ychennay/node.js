const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EventEmitter();

// the server.js module.export object is a constructor that passes
// in a client object and returns a new server instance
const server = require('./task-manager-server')(client);

rl.on("line", (command)=>{

    // emit an "command" event
    client.emit("command", command);
})