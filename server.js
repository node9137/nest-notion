// get the client
const mysql = require('mysql2/promise');
const createPage = require('./createPage');
const selectPage = require('./selectPage');
const { makeBreadcrumbs } = require('./makeBreadcrumbs');
const updatePage = require('./updatePage');
const { updateSublist } = require('./updateSublist');

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
async function main(query){
    
    const title = query.title;
    const parentId = 12
    /**
     * 부모 Page 호출
     */
    const page = await selectPage(pool,parentId);
    /**
     * breamcrumbs 생성
     */
    pool['breadcrumbs'] = makeBreadcrumbs(page,title);
    /**
     * 부모의 SubList 재 생성
     */
    const list = updateSublist(page,title);
    /**
     * 새로운 Page 생성
     */
    await createPage(pool,query)
    /**
     * 부모 Page 갱신
     */
    await updatePage(pool,list)

}

main(query)