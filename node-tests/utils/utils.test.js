const utils = require('./utils');

it('should add two numbers', () =>{
    var res = utils.add(33, 11);
    if (res != 44){
        throw new Error(`Value of sum not correct. 
        Expected 44. Received ${res}.`);
    }
});

it('should raise first number to the power of the second number', () =>{
    var res = utils.exponents(2,3);
    if (res != 8){
        throw new Error(`Value is not correct. Expected 8 but received ${res}.`);
    }
});