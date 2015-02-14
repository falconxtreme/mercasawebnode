var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:''
});

connection.connect();

connection.query('USE node');

connection.query('CREATE TABLE test '+
    ' (id int(11) AUTO_INCREMENT, ' +
    ' content varchar(255), ' +
    ' PRIMARY KEY (id)) ' 
);
console.log('Se creó correctamente las tablas de la base de datos.')
connection.query('insert into test (content) values ("HOLA")');
connection.query('insert into test (content) values ("MUNDO")');

console.log('Se insertó correctamente los registros en la base de datos.')
var userinput = '"); DELETE FROM test WHERE id=1; --';

connection.query('insert into test (content) values (?)',[userinput])

connection.end();