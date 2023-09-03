
const getPage = require('./routes/getPage');
const postPage = require('./routes/postPage');

const data = require('./samples/insertPageWithParent')
cosnt param =require('./samples/getPage')

async function main(){
    console.log(data)
    await postPage(data)
    
    const page = await getPage(param)
    console.log(page)
    
}

main()