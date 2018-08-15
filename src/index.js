const fs = require('fs');

/**
 * 过滤隐藏文件或文件夹
 * https://stackoverflow.com/questions/18973655/how-to-ingnore-hidden-files-in-fs-readdir-result
 * @param {Array} list 
 */
const filterFileList = (list) => {
    return list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
}

let folders = filterFileList(fs.readdirSync('./modules'));

folders.map( folder => {
    const files = filterFileList(fs.readdirSync(`./modules/${folder}`))
    let sn = {};

    files.map( file => {
        sn = Object.assign(sn, require(`./modules/${folder}/${file}`))    
    })

    fs.writeFileSync(`./build/@${folder}.code-snippets`, JSON.stringify(sn, null, 4), 'utf-8')
})


// fs.writeFileSync('@js.code-snippets', JSON.stringify(sn, null, 4), 'utf-8');

// console.log("dir:", files);