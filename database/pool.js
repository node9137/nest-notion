const mysql = require('mysql2/promise');
const connection = {
    host: '127.0.0.1',
//  host: 'host.docker.internal',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'nest-notion',
    connectionLimit: 30
}
module.exports = mysql.createPool(connection);