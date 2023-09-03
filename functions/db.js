import mysql from "mysql2/promise"

const connection = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'nest-notion',
    connectionLimit: 30
}

let pool = mysql.createPool(connection);

export default pool;