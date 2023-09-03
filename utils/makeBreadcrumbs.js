module.exports = function (parent,title) {
    if(!parent) return title
    return `${parent}+",${title}"`
}