var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:''
});


connection.connect();

connection.query('CREATE DATABASE node', function (err) {
    if (!err) {
        console.log('Se creó correctamente la base de datos.')
    }
    else {
        connection.end();
        throw err;
    }
});

connection.end();