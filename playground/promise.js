var asyncMult = (a, b) =>{
    return new Promise((resolve, reject) => {

        if (typeof a === 'number' && typeof b === 'number'){
            resolve(a * b);
        }else{
            reject("You didn't supply numbers to the asyncMult function!");
        }
    });
};

asyncMult(2,3).then((value) => {console.log("Answer: ", value)}).catch((errorMessage) =>{
    console.log(errorMessage);
});



var myPromise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        resolve("Promise was fulfilled. Now, we multiply again!");
        /* The line below will never be executed if there is no error , since only one resolve() or reject()
        can be executed within a promise.*/
        reject("Abort this mission!");
    },2000);
    console.log("Attempting to resolve promise...");
});

myPromise.then((message) => {
    console.log("Message from your Supreme Overlord:", message);
    asyncMult(2, "6").then((value) => {
        console.log(`The result of multiplying 2 by 6 is ${value}.`);
        asyncMult(value, value).then((squareResult) => {console.log(`If you square ${value}, you'll get ${squareResult}`)}).
        catch((catchError) =>{console.log("Catch statement activated: ", catchError)});
}).catch((errorCaught) =>{console.log(errorCaught)});
}, (errorMessage) => {
    console.log("Message from someone else: ", errorMessage);
});