var SQLCREATEDATABASE = "CREATE DATABASE MercasaTest ";
exports.SQLCREATEDATABASE = SQLCREATEDATABASE;


var SQLCREATETABLAS = ' CREATE TABLE producto ' +
    ' (id int(11) AUTO_INCREMENT, ' +
    ' codigointernoProducto varchar(30), ' +
    ' codigobarraProducto varchar(30), ' +
    ' tipoProducto varchar(30), ' +
    ' nombreProducto varchar(50), ' +
    ' marcaProducto varchar(50), ' +
    ' presentacionProducto varchar(50), ' +
    ' preciopormenorProducto decimal(10,2), ' +
    ' preciopormayorProducto decimal(10,2), ' +
    ' precioplazaveaProducto decimal(10,2), ' +
    ' preciowongProducto decimal(10,2), ' +
    ' preciomercasaProducto decimal(10,2), ' +
    ' margenmercasaProducto decimal(10,2), ' +
    ' PRIMARY KEY (id)) ' ;
exports.SQLCREATETABLAS = SQLCREATETABLAS;

/*
var SQLCREATETABLAS =  " CREATE TABLE IF NOT EXISTS `test` ( " +
    " `id` int(11) NOT NULL, " +
    " `content` varchar(255) DEFAULT NULL, "
    " `precio` decimal(10,0) NOT NULL DEFAULT '0' " +
    " ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1; "
exports.SQLCREATETABLAS = SQLCREATETABLAS;
*/
