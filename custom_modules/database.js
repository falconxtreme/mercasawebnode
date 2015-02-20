// dependencies windows
var mysql = require('mysql');
var queriesInicioBD = require('./crearbdinicial');
var queriesLeerTablas = require('./leerTablas');
var queriesInsertarTablas = require('./insertarTablas');

// run query to db
var dbConfig = {
   host:'localhost',
   user:'root',
   password:'root'
};

// run query to db
var dbConfigWithBD = {
   host:'localhost',
   user:'root',
   password:'root',
   database: 'MercasaTest'
};

var runQueryIniBD = function (Query) {
    var connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) throw err;
    });

    connection.query(Query, function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('Se corrió correctamente el query.');
        }
    });

    connection.end();
}

var runQueryIni = function (Query) {
    var connection = mysql.createConnection(dbConfigWithBD);
    connection.connect(function (err) {
        if (err) throw err;
    });

    connection.query(Query, function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('Se corrió correctamente el query.');
        }
    });

    connection.end();
}

var runQueryWithoutData = function(Query,callback){
   var connection = mysql.createConnection(dbConfigWithBD);
   connection.connect(function(err) {
      if (err) throw err;
   });
   
   connection.query(Query,function(err, res){
         if (err) throw err;
         if (callback){
            callback(res);
         }
      }
   );
        connection.end();
}

var runQueryWithData = function(Query,Data,callback){
   var connection = mysql.createConnection(dbConfigWithBD);
   connection.connect(function(err) {
      if (err) throw err;
   });
   
   connection.query(Query,Data,function(err, res){
         if (err) throw err;
         if (callback){
            callback(res);
         }
      }
   );
        connection.end();
}

var runQueryWithManyProducts = function (Query, Productos, callback) {
    var connection = mysql.createConnection(dbConfigWithBD);
    connection.connect(function (err) {
        if (err) throw err;
    });
    var count = 0;
    for (obeProducto in Productos) {
        connection.query(Query, [Productos[count].codigointerno, Productos[count].codigobarra, Productos[count].tipo,
            Productos[count].nombre, Productos[count].marca, Productos[count].presentacion, Productos[count].preciopormenor, Productos[count].preciopormayor,
            Productos[count].precioplazavea, Productos[count].preciowong, Productos[count].preciomercasa, Productos[count].margenmercasa], function (err, res) {
                if (err) throw err;
                if (callback) {
                    callback(res);
                }
            }
        );
        count++;
    }
    connection.end();
}



// module
var DB = function(config){
   config = config || {};
}

DB.prototype.createDataBase = function(){
   var Query = queriesInicioBD.SQLCREATEDATABASE;
   runQueryIniBD(Query);
}

DB.prototype.createTables = function(){
   var Query = queriesInicioBD.SQLCREATETABLAS;
   runQueryIni(Query);
}

DB.prototype.getAllProducts = function(callback){
   var Query = queriesLeerTablas.SQLREAD_ALLPRODUCTS;
   runQueryWithoutData(Query,function(res){
      //res = res.pop();
      callback(res);
   });
}

DB.prototype.insertProduct = function(data, callback){
   var Query = queriesInsertarTablas.SQLINSERTPRODUCT;
   runQueryWithData(Query, data, function(res){
      //res = res.pop();
      callback(res);
   });
}

DB.prototype.insertAllProducts = function(Productos, callback){
   var Query = queriesInsertarTablas.SQLINSERTPRODUCT;
   runQueryWithManyProducts(Query, Productos, function(res){
      //res = res.pop();
      callback(res);
   });
}

/*
DB.prototype.saveSingleData = function(data){
   var Query = queries.SQLSAVESINGLEDATA;
   var Data  = data;
   runQuery(Query,Data);
}
*/


module.exports = DB;