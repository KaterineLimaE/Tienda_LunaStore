const express = require('express');
const router = express.Router();
const connection = require('./mysql'); // Importa la conexión a la base de datos

router.get('/', (req, res) => {
  const tableName = 'TPrendas';
  const sqlQuery = `SELECT * FROM ${tableName}`;
  
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error al obtener los datos de la base de datos');
    }
    res.render('eliminar', { results }); // Pasa la variable 'results' al renderizar la vista
  });
});
// Ruta para manejar el proceso de eliminación
router.post('/', (req, res) => {
  const selectedPrendas = req.body.selectedPrenda; // Array con los IDs de las prendas seleccionadas

  if (!selectedPrendas || !Array.isArray(selectedPrendas)) {
    return res.status(400).send('No se seleccionaron prendas para eliminar');
  }

  const tableName = 'TPrendas';
  const sqlQuery = `DELETE FROM ${tableName} WHERE ID_Prenda IN (?)`;

  connection.query(sqlQuery, [selectedPrendas], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error al eliminar las prendas');
    }

    console.log(`${result.affectedRows} prendas eliminadas`);
    res.redirect('/eliminar'); // Redirige nuevamente a la página de eliminación
  });
});

module.exports = router;
