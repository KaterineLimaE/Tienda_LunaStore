var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Luna Store' });
});

router.get('/catalogo', function(req, res, next) {
  res.render('catalogo', { title: 'Luna Store' });
});

router.get('/admi', function(req, res, next) {
  res.render('admi', { title: 'Luna Store' });
});

router.get('/insertar', function(req, res, next) {
  res.render('insertar', { title: 'Luna Store' });
});

router.get('/mostrar', function(req, res, next) {
  res.render('mostrar', { title: 'Luna Store' });
});

router.get('/actualizar', function(req, res, next) {
  res.render('actualizar', { title: 'Luna Store' });
});

router.get('/informe', function(req, res, next) {
  res.render('informe', { title: 'Luna Store' });
});

router.get('/why', function(req, res, next) {
  res.render('why', { title: 'Luna Store' });
});

router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'Luna Store' });
});

module.exports = router;
