module.exports = async function (pool,param,id) {
    try{
        const result = await pool.query('UPDATE page SET subPages = ? WHERE page_id=?',param,id)
        return {"code":0,"data":result[0][0]}
    }
    catch(err){
        return {"code":1,"data":err}
    }
}