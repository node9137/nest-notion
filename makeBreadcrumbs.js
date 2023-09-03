export function makeBreadcrumbs(parent,title){
    if(!parent)return `Page: ${title}`
    return `${parent}+", ${title} "`
}