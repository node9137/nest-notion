
const getPage = require('./routes/getPage');
const postPage = require('./routes/postPage');



const data = {
    parentId  : 5,
    post : {
        title :"456",
        content:"456",
        subpages:"1,5,8",
        breadcrumbs:"Title1,Title2,Title10,Title3"
    }
}

async function main(){
    
    param = {
        postId:4
    }
    const page = await getPage(param)
    console.log(page)
    
}

main()