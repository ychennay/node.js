const express = require('express');
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

var url = '/';
var aboutUrl = '/about';

app.get(url, (req, res) =>{
res.send("<h1>Hello Express</h1>");
});

app.get('/about', (req, res)=> {
res.render('about.hbs',{
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    currentYear: new Date().getFullYear(),
    pageTitle: 'About Us'


});
});

app.listen(3000);
