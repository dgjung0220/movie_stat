var path = require('path');
var express = require('express');
var app = express();
var exphs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var route = require('./route.js');

app.set('views', __dirname + '/views');
app.engine('handlebars', exphs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials'
}).engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);

app.use('/', route);
app.use('/public/', express.static(path.join(__dirname, 'public')));

mongoose.connection.openUri('mongodb://localhost/rosybrown');
mongoose.connection.on('open', function() {
    console.log('[Mongoose] Connected to Rosy Brown Database.')
});

app.listen(app.get('port'), function() {
    console.log('Socket IO server listening on port' + app.get('port'));
});