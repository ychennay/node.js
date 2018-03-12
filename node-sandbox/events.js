const fs = require('fs');
const EventEmitter = require('events');

class Timer extends EventEmitter{

    timeIt(func, ...args){
        console.time('timeIt');
        func(...args, (error, data) =>{
            
        })
        console.timeEnd('timeIt');
    }
}

timer = new Timer();
timer.timeIt();