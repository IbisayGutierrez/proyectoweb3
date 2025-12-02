import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de conexión
pool.getConnection()
  .then(connection => {
    console.log('Conexión a la base de datos establecida correctamente.');
    connection.release();
  })
  .catch(err => {
    console.error('Error conectando a la base de datos:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Credenciales incorrectas. Verifica el usuario y la contraseña.');
    }
  });

export default pool;