const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.getConnection((err,connection) => {
    if(err) {
        console.error('Error conectando a la base de datos:', err.message);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Credenciales incorrectas. Verifica el usuario y la contraseña.');
        }
    } else {
        console.log('Conexión a la base de datos establecida correctamente.');
        connection.release();
    }
});

module.exports = connection;