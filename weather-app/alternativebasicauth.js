var passport = require('passport');

var BasicStrategy = require('passport-http').BasicStrategy;

var users = require(__dirname + '/userdata/users')

passport.use(new BasicStrategy(function(username,passsword, done){

    var user = users.checkCredentials(username,password)
    if (user)
        return done(null, true)
    else
        return done(null, false)
}));


var autho = passport.authenticate('basic', {session: false});

exports.autho = autho;