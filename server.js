
const getPage = require('./routes/getPage');
const postPage = require('./routes/postPage');



const data = {
    parentId  : 5,
    post : {
        title :"456",
        content:"456",
        subpages:"1,5,8,",
        breadcrumbs:"1,2,3,5"
    }
}

async function main(){
    
    param = {
        postId:1
    }

    const page = await getPage(param)
    
}

main()