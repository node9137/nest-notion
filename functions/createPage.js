
module.exports = (pool,query) => {
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