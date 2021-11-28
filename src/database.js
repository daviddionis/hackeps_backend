const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mysql = require('mysql');

const { promisify } = require('util');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') console.error('Conexion perdida');
        if (err.code == 'ER_CON_COUT_ERROR') console.error('La base de datos tiene demasiados conexiones');
        if (err.code == 'ECONNREFUSED') console.error('Conexion Rechazada');
    }
    if (connection) {
        connection.release();
        console.log('La Base de Datos está conectada');
    }
    return;
});

//De esta manera podemos hacer promesas
pool.query = promisify(pool.query);

module.exports = pool;