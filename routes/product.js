var express = require('express');
var router = express.Router();
var routes = require('../routes/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'MERCASA'});
});

var DATABASE = require('../custom_modules/database');
var BD = new DATABASE();

var productosBD;

router.post('/', function (req, res) {
    console.log(req.body);
    BD.insertProduct([req.body.codigointerno, req.body.codigobarra, req.body.tipo, 
        req.body.nombre, req.body.marca, req.body.presentacion, req.body.preciopormenor, req.body.preciopormayor, 
        req.body.precioplazavea, req.body.preciowong, req.body.preciomercasa, req.body.margenmercasa], function (response) {
        console.log(response);
    })
    BD.getAllProducts(function (productosBD) {
        //console.log(productosBD);
        res.render('index', { title: 'MERCASA', productos: productosBD });
    });
});

module.exports = router;
