var users = [
    { id: 1, name: "Yu", email: "ychennay@gmail.com", password: "123"},
    { id: 2, name: "Dan", email: "dantheman@gmail.com", password: "dtm"}
];


var checkCredentials = function(username, password){

    var user = users.find(function(u) {
        return u.name === username && u.password === password;
    });

    return user;
}

exports.checkCredentials = checkCredentials;