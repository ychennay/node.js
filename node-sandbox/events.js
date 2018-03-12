const fs = require('fs');
const EventEmitter = require('events');

class Timer extends EventEmitter{

    timeIt(func, ...args){
        console.time('timeIt');
        func(...args, (error, data) =>{
            this.emit('begin');
            if (error){
                return this.emit('error', error);
            }
            this.emit('data', data);
            console.timeEnd('timeIt');
            this.emit('end');
            
        });
    
    }
}

timer = new Timer();
timer.on('data', ()=>{console.log("Data received")});
timer.on('end', ()=>{console.log("Done")});
timer.on('begin', ()=>{console.log("Begin")});
timer.on('error', ()=>{console.log("Error is happening.")});


timer.timeIt(fs.readFile, "mk");