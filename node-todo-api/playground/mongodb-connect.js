const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',
(err, db) => {
    if (err){
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server")

    db.collection('Todos').insertOne({
        text: "Boom boa",
        completed: false
    }, (err, result) =>{
        if (err){
            return console.log("Unable to insert.");
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

    });

    db.collection('Users').insertOne({
        name: 'Yu Chen',
        age: 29,
        gender: 'M'
    }, (err, result) =>{
        if (err){
            console.log("An error in Users insertion.");
        }
        console.log(JSON.stringify(result.ops));
    })





    db.close();
}
);