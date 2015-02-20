var express = require('express');
var router = express.Router();
var DATABASE = require('../custom_modules/database');
var BD = new DATABASE();

var productosBD;

/* 
BD.getAllProducts(function(productosBD){
   console.log(productosBD);
});
*/

router.get('/', function(req, res, next) {
    BD.getAllProducts(function(productosBD){
       //console.log(productosBD);
       res.render('index', { title: 'MERCASA', productos: productosBD});
    });
});

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', productos: productosBD});
});*/

module.exports = router;
