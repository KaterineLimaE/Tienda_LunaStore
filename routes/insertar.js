var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise'); // Importamos el módulo 'mysql2/promise'
const multer = require('multer');
const path = require('path');

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

// Configuración de la conexión a la base de datos
const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'BD_Luna'
  });
};

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Cambia la ruta a donde quieras almacenar las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    cb(null,file.fieldname + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/*
// Ruta para mostrar el formulario
router.get('/insertar', function(req, res, next) {
  res.render('index', { title: 'Administrar Inventario' });
});
*/
// Ruta para manejar el envío del formulario
router.post('/insertar', upload.single('imagen'), async function(req, res, next) {
  const { nombres, descripcion, categoria, precio, optionsRadios, color, stock } = req.body;
  const imagen = req.file.filename; // Nombre de la imagen subida

  const codigo = 'P' + Math.floor(Math.random() * 10000); // Generar un código aleatorio

  const connection = await createConnection();

  try {
    // Insertar datos en la tabla 'prendas'
    await connection.execute(
      'INSERT INTO tprendas (ID_Prenda, nombre, precio, categoria, descripcion) VALUES (?, ?, ?, ?, ?)',
      [codigo, nombres, precio, categoria, descripcion]
    );

    // Insertar datos en la tabla 'prenda_Detalles'
    await connection.execute(
      'INSERT INTO tprendadetalles (ID_Prenda, talla, color, imagen, stock) VALUES (?, ?, ?, ?, ?)',
      [codigo, optionsRadios, color, imagen, stock]
    );

    // Redirigir a la página de mostrar inventario
    res.redirect('/mostrar');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar el formulario');
  } finally {
    connection.close();
  }
});


module.exports = router;