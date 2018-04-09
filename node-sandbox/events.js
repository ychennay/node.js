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
timer.on('data', (data)=>{
    console.log("Data received");
    console.log(`Length: ${data.length}`);

});
timer.on('end', ()=>{console.log("Done")});
timer.on('begin', ()=>{console.log("Begin")});

// if we do not handle the error event with a listener, the node process
// exit completely. Check this by uncommenting the line below to see what
// happens: the second (successful) timeIt call will never be executed.
//timer.on('error', ()=>{console.log("Error is happening.")});

process.on('uncaughtException', (err)=>{
    console.log(`This is my error: ${err}`);  
    process.exit(1);
})

timer.timeIt(fs.readFile, "as");
timer.timeIt(fs.readFile, __filename);