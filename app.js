var createError = require('http-errors');
var express = require('express');
const  mysql = require ( 'mysql' ) ; 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// *********************************************************************************
// Configura las credenciales de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '201229',
  database: 'BD_Luna',
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  console.log('Conexión exitosa a la base de datos');
});
// MOSTRAR:
app.get('/mostrar', (req, res) => { // Cambiado de '/' a '/mostrar'
  const tableName = 'TPrendas';
  const sqlQuery = `SELECT * FROM ${tableName}`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error al obtener los datos de la base de datos');
    }
    res.render('mostrar', { results });
  });
});

//ELIMINAR:
app.get('/eliminar', (req, res) => {
  // Renderiza la página con el formulario
  res.render('eliminar', { results: [] }); // Puedes inicializar "results" como un arreglo vacío

  // También puedes mover la lógica de procesamiento de formulario aquí si prefieres
});
// BUSCAR *
app.post('/eliminar', (req, res) => {
  const tableName = 'TPrendas';
  const name = req.body.nombrePrenda;// Obtener el nombre desde el formulario

  if (!name) {
    return res.redirect('/eliminar'); // Redirecciona si el nombre no se ingresó
  }

  const sqlQuery = `SELECT * FROM ${tableName} WHERE Nombre = ?`;

  connection.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error al obtener los datos de la base de datos');
    }
    if (results.length > 0) {
      res.render('eliminar', { results: results, hasResults: true });
    } else {
      res.render('eliminar', { results: [], hasResults: false });
    }
    // Cierra la conexión después de obtener los resultados
    
  });
});

// ELIMINAR:
app.post('/eliminar', (req, res) => {
  const tableName = 'TPrendas';
  const selectedIds = req.body.selectedPrenda; // Obtener los IDs seleccionados desde el formulario

  if (!selectedIds || !Array.isArray(selectedIds)) {
    return res.redirect('/eliminar'); // Redirecciona si no hay IDs seleccionados
  }

  console.log('selectedIds:', selectedIds);
  const sqlQuery = `DELETE FROM ${tableName} WHERE ID_Prenda IN (?)`;

  console.log('sqlQuery:', sqlQuery);

  connection.query(sqlQuery, [selectedIds], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error al eliminar los datos de la base de datos');
    }
    console.log('Registros eliminados:', result.affectedRows);

    // Redirecciona a la página de eliminación después de eliminar
    res.redirect('/eliminar');
  });
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// Configuración de middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

