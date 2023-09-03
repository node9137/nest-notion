export function updateSublist(parent,title){
    if(!parent)return `Page: ${title}`
    return `${parent}+", ${title} "`
}