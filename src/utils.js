/**
 * 数组添加Commit
 * @param {Array} snippet 
 */
const handleCommit = ( snippet, name ) => {
    const snName = name.slice(1);
    
    snippet.unshift(`/* start ${snName} */`);
    snippet.push(`/* end ${snName} */`);

    return snippet;
}

/**
 * 文本转为数组
 * @param {String} text 
 */
function buildBodyFromText(text) {
    var fixed = text.replace(/\t/g, '\\t');
    return fixed.split("\n");
}

/**
 * 过滤隐藏文件或文件夹
 * https://stackoverflow.com/questions/18973655/how-to-ingnore-hidden-files-in-fs-readdir-result
 * @param {Array} list 
 */
const filterMenu = (list) => {
    return list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
}

module.exports = {
    handleCommit,
    buildBodyFromText,
    filterMenu,
}