module.exports = async function (pool,param) {
    try{
        const result = await pool.query('SELECT * FROM page WHERE page_id=?',param)
        return {"code":0,"data":result[0][0]}
    }
    catch(err){
        return {"code":1,"data":err}
    }
} 