const EventEmitter = require('events');


class Logger extends EventEmitter {

    logRequest(func){
        console.log("Prior to execution.");
        this.emit('searchReceived');
        func();
        this.emit('searchLogged');
        console.log("After execution.")
    }
}

const logger = new Logger();


hollabackFunc = () => {
    console.log("Hollerin'");
}

sandwichFunc = () => {
    console.log("In the middle..'");
}

callbackFunc = function(a,b){

    // for (i = 0; i < 1000000000; i++){

    // }

    console.log(a + b);
}


const slowAdd = (a,b) =>{
    setTimeout(()=>{
        callbackFunc(a,b)}, 0);

        setImmediate(()=>{
            callbackFunc(2*a,b);
        })
}

var fs = require('fs');
fs.readFile("my-file-path.txt", function() {
    setTimeout(function(){
        console.log("SETTIMEOUT");
    });
    setImmediate(function(){
        console.log("SETIMMEDIATE");
    });
});

console.log("This will get printed first.")


/** when the call stack is empty, and the queue is 
 * not empty, dequeue an event, and call the callback from
 * that event if it exists (push it onto the call stackLoop until the event queue is empty.**/

//slowAdd(3,4);
//slowAdd(9,4);



logger.on('searchReceived', callbackFunc);
logger.on('searchLogged', hollabackFunc);
logger.emit("searchReceived");
logger.emit("searchLogged");
logger.emit("searchLogged");
logger.emit("searchLogged");
logger.logRequest(sandwichFunc)

console.log(__filename);