const pool = require('../database/pool');
const selectPage = require('../functions/selectPage');
const parsingStringToArray = require('../utils/parsingStringToArray');

module.exports = async function getPage(param){
    const postId = param.postId
    const page = await selectPage(pool,postId);
    const data = page.data
    data.breadcrumbs = data.breadcrumbs.length !=='' ? parsingStringToArray(data.breadcrumbs):null
    data.subpages = data.subpages.length !=='' ? parsingStringToArray(data.subpages):null
    return data
}