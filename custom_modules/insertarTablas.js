var SQLINSERTPRODUCT =   ' insert into producto ' +
    '(codigointernoProducto, codigobarraProducto, ' +
    'tipoProducto, nombreProducto, marcaProducto, ' +
    'presentacionProducto, preciopormenorProducto, ' +
    'preciopormayorProducto, precioplazaveaProducto, ' +
    'preciowongProducto, preciomercasaProducto, margenmercasaProducto) ' +
    ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ';
exports.SQLINSERTPRODUCT = SQLINSERTPRODUCT;