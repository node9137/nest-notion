const pool = require('../database/pool');
const createPage = require('../functions/createPage');
const selectPage = require('../functions/selectPage');
const  makeBreadcrumbs  = require('../utils/makeBreadcrumbs');
const updatePage = require('../functions/updatePage');
const  updateSublist  = require('../utils/updateSublist');

module.exports = async function postPage(body){
    const parentId = body.parentId
    if(parentId){
        const title = body.title
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
     * 부모 Page 갱신
     */
    await updatePage(pool,list)
    }
    /**
     * 새로운 Page 생성
     */
    await createPage(pool,body.post)
    return
}