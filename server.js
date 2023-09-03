// get the client
const mysql = require('mysql2/promise');


const connection = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'nest_notion',
    connectionLimit: 30
}

let pool = mysql.createPool(connection);

const createTablePages = 'CREATE TABLE IF NOT EXISTS pages (pageId INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), content VARCHAR(255), subPages JSON, breadcrumbs JSON)';


const getBreadcrumbsFromParentPage = async (connectionPool, pageId) => {
    const breadcrumbs = await connectionPool.execute(`SELECT json_extract(breadcrumbs, "$") from pages WHERE pageId = ${pageId}`);
    return breadcrumbs[0][0]['json_extract(breadcrumbs, "$")'];
}

const makeNewPage = (title, content, parentPages) => {
    let breadcrumbs;
    if (parentPages.length > 0) {
        breadcrumbs = "json_array("+parentPages+")";
    } else {
        breadcrumbs = JSON.stringify("[]");
    }
    return `INSERT INTO pages (title, content, subPages, breadcrumbs) VALUES ("${title}", "${content}", "[]", ${breadcrumbs})`;
}
const appendPageToParentPage = (pageId, parentPageId) => {
    return `UPDATE pages SET subPages = json_array_append(subPages, "$", ${pageId}) WHERE pageId = ${parentPageId}`;
}


async function main() {
    await pool.execute(createTablePages);
    // 페이지 생성
    // 부모 페이지가 있거나 없는 경우 2가지에 따라 다르게 처리합니다.
    const parentPageId = 23;            // 23페이지에서 새로운 페이지를 생성하는 경우
    // const parentPageId = null;       // 부모 페이지 없이 새로운 페이지 생성하는 경우
    let parentPageBreadcrumbs;
    if (parentPageId) {
        parentPageBreadcrumbs = await getBreadcrumbsFromParentPage(pool, parentPageId);
        parentPageBreadcrumbs.push(parentPageId);
    } else {
        parentPageBreadcrumbs = [];
    }
    const result = await pool.execute(makeNewPage("testTitle2", "testContent2", parentPageBreadcrumbs));
    // 부모 페이지가 있는 경우 부모 페이지의 subPages 에 새로 생성된 페이지를 추가합니다.
    if (parentPageId) await pool.execute(appendPageToParentPage(result[0].insertId, parentPageId));

    // 새로 생성된 페이지 정보
    await console.log(result);

}

main();


//
// let query = {
//     "title" : "123",
//     "content" : "123",
//     "subpages" : "123"
// }
//
// const createPage = (query) => {
//     return new Promise(function (resolve, reject) {
//         pool.query(`INSERT INTO page SET ?`, query)
//             .then(result => {
//                 resolve({"code": 0, "data": result[0]})
//             })
//             .catch(err => {
//                 console.log(err);
//                 reject({"code": 1, "data": err})
//             })
//     });
// };
//
// createPage(query)
// .then(result =>{
//     console.log(result)
// })
// .catch(err => {
//     console.log(err)
// })
