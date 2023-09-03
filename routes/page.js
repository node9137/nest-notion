import express from "express";
import db from "../functions/db.js"
const router = express.Router()

let table = "page";

let sampleData = [
    {
        title : "A",
        subPages : '["A-1", "A-2"]',
        breadcrumbs : '["A"]'
    },
    {
        title : "A-1",
        subPages : '["A-1-1", "A-1-2"]',
        breadcrumbs : '["A", "A-1"]'
    },
    {
        title : "A-2",
        subPages : '[]',
        breadcrumbs : '["A", "A-2"]'
    },
    {
        title : "A-1-1",
        subPages : '[]',
        breadcrumbs : '["A", "A-1", "A-1-1"]'
    },
    {
        title : "A-1-2",
        subPages : '[]',
        breadcrumbs : '["A", "A-1", "A-1-2"]'
    },
]


router.get('/', (req, res) => {
    res.json("this page is page router")
})


router.get('/pageList', async(req, res) => {
    let query = `SELECT * FROM ${table}`;
    await db.query(query)   
    .then(result =>{
        res.json({"code" : 0, "data" : result[0] })
    })
    .catch(err => {
        res.json({"code" : 1, "data" : err })
    })      
})

router.get('/getPage/:pageId', async (req, res) => {
    let condition = req.params
    let query = `SELECT * FROM ${table} WHERE ?`;
    await db.query(query, condition)   
    .then(result =>{
        res.json({"code" : 0, "data" : result[0] })
    })
    .catch(err => {
        res.json({"code" : 1, "data" : err })
    })      
})

router.get('/importSamplePage', async (req, res) => {
    console.log("start")
    for(let i=0; i<sampleData.length; i++){
        db.pool.query(`INSERT INTO ${table} SET ?`, sampleData[i])
    }
    res.json("imput data!!!")
})

export default router;