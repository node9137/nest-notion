// get the client
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: 'host.docker.internal:3306',
        user: 'test',
        password: '1234',
        database: 'nest-notion'
    });

    const result = await connection.execute(
        `CREATE TABLE pages (
    page_id INT AUTO_INCREMENT,
    title VARCHAR(255),
    content VARCHAR(255),
    sub_pages VARCHAR,
    PRIMARY KEY (page_id)
    )`, function (err, results, fields) {
            console.log(results);
            console.log(fields);
        });

    await console.log(connection)
};

main();
