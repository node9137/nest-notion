// get the client
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

let pool = mysql.createPool(connection);

let query = {
    "title" : "123",
    "content" : "123",
    "subpages" : "123"
}

const createPage = (query) => {
    return new Promise(function(resolve, reject) {
        pool.query(`INSERT INTO page SET ?`, query)
        .then(result =>{
            resolve({"code" : 0, "data" : result[0] })
        })
        .catch(err => {
            console.log(err);
            reject({"code" : 1, "data" : err })
        })                      
    });     
};

createPage(query)
.then(result =>{
    console.log(result)
})
.catch(err => {
    console.log(err)
})
