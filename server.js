// get the client
const mysql = require('mysql2/promise');
const createPage = require('./createPage');

const connection = {
    host: '127.0.0.1',
//  host: 'host.docker.internal',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'nest-notion',
    connectionLimit: 30
}

let pool = mysql.createPool(connection);

async function main(){
    let query = {
        "title" : "123",
        "content" : "123",
        "subpages" : "123"
    } 
    await createPage(pool,query)
}

main()