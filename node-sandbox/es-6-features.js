// example of map function
var myNewArray = [31,321,11];
var otherArray = myNewArray.map((element) => { return element + 1} );
console.log(otherArray);

// example of forEach function
var forEachArray = myNewArray.forEach((element, index) => {
   console.log(`${index}: ${element}`);
   myNewArray[index] = element + 3;
 });
console.log(`Results of forEach: ${myNewArray}`);

// example of filter function
var testedArray = myNewArray.filter(x => x >30);
console.log(`Results of filter: ${testedArray}`);

// example of an iterator

const makeIterator = (array) => {
    var nextIndex = 0;

    return {
       next: function() {
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    };
}

var myIterator = makeIterator(myNewArray);
console.log(`Output of iterator after first call: ${JSON.stringify(myIterator.next())}`);
console.log(`Output of iterator after first call: ${JSON.stringify(myIterator.next())}`);
