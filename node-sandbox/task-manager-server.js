const EventEmitter = require('events');

class Server extends EventEmitter{

    constructor(client){
        super();
        client.on('command', (command)=>{
            console.log(`Command: ${command}`);

            switch(command){
                case "help":
                case "add":
                case "ls":
                case "delete":
            }

        })

    }

    help(){
        this.emit("response", "help");
    }
    add(){
        this.emit("response", "add");
    }
    ls(){
        this.emit("response", "ls");
    }
    delete(){
        this.emit("response", "delete");
    }
}

module.exports = (client) => new Server(client);
