const utils = require('./utils');
const expect = require('expect');
it('should add two numbers', () =>{
    var res = utils.add(33, 11);
    expect(res).toBe(44).toBeA('number');
});

it('should raise first number to the power of the second number', () =>{
    var res = utils.exponents(2,3);
    expect(res).toBe(8).toBeA('number');
});

it('should be equal to an object of the same type', () =>{
//    expect({name: 'Yu Chen', weight: 195}).toBe({name: 'Yu Chen', weight: 195});
    expect({name: 'Yu Chen', weight: 195}).toEqual({name: 'Yu Chen', weight: 195});


});