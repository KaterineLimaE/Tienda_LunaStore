const mysql = require('mysql');
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
  module.exports = connection;