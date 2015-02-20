var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var product = require('./routes/product');
var users = require('./routes/users');
var DATABASE = require('./custom_modules/database');
var file = require('./routes/file');

var formidable = require('formidable');

var app = express();
//interaction DATABASE
//var BD = new DATABASE();
//BD.createDataBase();
//BD.createTables();
//BD.getAllProducts(function(res){
//   console.log(res);
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/product', product);
app.use('/users', users);
app.use('/file', file);
app.use('/file/product', file);

app.post('/product', product);
app.post('/file', file);
/*
app.post('/file', function (req, res, next) {
    var incoming = new formidable.IncomingForm();
    incoming.uploadDir = 'uploads';
    incoming.on('fileBegin', function (field, file) {
        if (file.name) {
            file.path += "-" + file.name;
            console.log("ARCHIVO A SUBIR: " + file.path);
        }
    }).on('file', function (field, file) {
        if (!file.size) { return; }
        console.log(file.name + " recibido")
    }).on('end', function () {
        res.render('file', { title: 'MERCASA', rptasubida: '1' });
    });
    incoming.parse(req);
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
