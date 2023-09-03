const pool = require('../database/pool');
const selectPage = require('../functions/selectPage');
const parsingStringToArray = require('../utils/parsingStringToArray');
const express = require('express')
const router = express.Router()

router.get('/getPage/:pageId',async(req,res)=>{
    const params = req.params
    const pageId = params.pageId
    const page = await selectPage(pool,pageId);
    const data = page.data
    data.breadcrumbs = data.breadcrumbs.length !=='' ? parsingStringToArray(data.breadcrumbs):null
    data.subpages = data.subpages.length !=='' ? parsingStringToArray(data.subpages):null
    return res.json(data)
})

module.exports = router;