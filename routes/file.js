var express = require('express');
var router = express.Router();
var routes = require('../routes/index');
var productmodel = require('../models/product');
var lineReader = require('line-reader');

var formidable = require('formidable');


/* GET Create page. */
router.get('/', function (req, res, next) {
    //res.render('create', { title: 'MERCASA'});
    console.log("entra a file");
    res.render('file', { title: 'MERCASA', rptasubida: '0' });
});

/* GET Create page. */
router.get('/product', function (req, res, next) {
    console.log("entra a file/productos");
    var Productos = [];
    lineReader.eachLine('uploads/fileprod.txt', function (line) {
        var res = line.split(',');
        //console.log(line);
        //console.log(res);
        if (res[12].substring(res[12].length - 1, res[12].length)=="\r"){
            res[12] = res[12].substring(0, res[12].length - 1)
        }
        var productGen = new productmodel.productModel(res[1], res[2], res[3], res[4], res[5], res[6], res[7], res[8], res[9], res[10], res[11], res[12]);
        Productos.push(productGen);
    }).then(function () {
        var DATABASE = require('../custom_modules/database');
        var BD = new DATABASE();
        //var count = 0;
        if (Productos!=null && Productos!=undefined){
            if (Productos.length>0){
                BD.insertAllProducts(Productos,function (response) {
                    console.log(response);
                });    
            }
        }
        /*for (Prod in Productos) {
            console.log("producto: " + count);
            console.log(Productos[count]);
            
            BD.insertProduct([Productos[count].codigointerno, Productos[count].codigobarra, Productos[count].tipo,
            Productos[count].nombre, Productos[count].marca, Productos[count].presentacion, Productos[count].preciopormenor, Productos[count].preciopormayor,
            Productos[count].precioplazavea, Productos[count].preciowong, Productos[count].preciomercasa, Productos[count].margenmercasa], function (response) {
                console.log(response);
            });
            count++;
        }*/
        

        
        /*BD.getAllProducts(function (productosBD) {
            res.render('index', { title: 'MERCASA', productos: productosBD });
        });*/
        //res.render('file', { title: 'MERCASA'});
        res.send("productos subidos correctamente: ");
    });

});

router.post('/', function (req, res, next) {
    var incoming = new formidable.IncomingForm();
    var filename = "";
    incoming.uploadDir = 'uploads';
    incoming.on('fileBegin', function (field, file) {
        if (file.name) {
            file.path = 'uploads\\' + file.name;
            filename=file.name;
            console.log("ARCHIVO A SUBIR: " + file.path);
        }
    }).on('file', function (field, file) {
        if (!file.size) { return; }
        console.log(file.name + " recibido")
    }).on('end', function () {
        //---------------------------------------------------------------------
        /*console.log("FILE.NAME: " + filename);
        res.render('file', { title: 'MERCASA', rptasubida: '1' });*/
        
        var Productos = [];
        lineReader.eachLine('uploads/' + filename, function (line) {
            var res = line.split(',');
            if (res[12].substring(res[12].length - 1, res[12].length) == "\r") {
                res[12] = res[12].substring(0, res[12].length - 1)
            }
            var productGen = new productmodel.productModel(res[1], res[2], res[3], res[4], res[5], res[6], res[7], res[8], res[9], res[10], res[11], res[12]);
            Productos.push(productGen);
        }).then(function () {
            var DATABASE = require('../custom_modules/database');
            var BD = new DATABASE();
            if (Productos != null && Productos != undefined) {
                if (Productos.length > 0) {
                    BD.insertAllProducts(Productos, function (response) {
                        console.log(response);
                    });
                }
            }
            res.render('file', { title: 'MERCASA', rptasubida: '1' });
        });
        //---------------------------------------------------------------------

    });
    incoming.parse(req);
});

module.exports = router;
