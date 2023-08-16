const express = require('express');
const router = express.Router();
const connection = require('./mysql'); // Importa la conexión a la base de datos

router.get('/', (req, res) => { // Cambiado de '/' a '/mostrar'
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
      

module.exports = router;
