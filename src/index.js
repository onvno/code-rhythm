const yaml = require('js-yaml');
const fse   = require('fs-extra');
const path = require('path');
const util = require('./utils.js');

const { filterMenu, handleCommit, buildBodyFromText } = util;
const MODULE_PATH = path.join(__dirname, 'modules');
const BASE_PATH = path.join(__dirname, '');
const BUILD_DIR_PATH = path.join(__dirname, '../snippets');
console.log("BUILD_DIR_PATH:", BUILD_DIR_PATH);

/**
 * empty
 */
fse.emptyDirSync(BUILD_DIR_PATH);

/**
 * 1. 读取目录
 * 2. 处理yaml文件
 * 3. 增加注释
 * 4. 文件合并输出
 */
let folders = filterMenu(fse.readdirSync(`${MODULE_PATH}`));
let repeatSn = [];

folders.map( folder => {
    const folderPath = path.join(MODULE_PATH, folder)
    const files = filterMenu(fse.readdirSync(folderPath))
    let sn = {};

    files.map( file => {
        const filePath = path.join(MODULE_PATH, folder, file)
        const parts = yaml.safeLoad(fse.readFileSync(filePath, 'utf8'));

        parts.map( part => {
            const bodyCode = buildBodyFromText(part.body);
            const bodyCont = handleCommit(bodyCode, part.prefix);
    
            if(sn[part.prefix]){
                repeatSn.push(part.prefix);
            }
            sn[part.prefix] = {
                prefix: part.prefix,
                body: bodyCont,
                description: part.description
            }
        } )
    })

    const newText = JSON.stringify(sn, null, '\t');

    const snPath = path.join(BUILD_DIR_PATH, `./${folder}.code-snippets`);
    fse.ensureFileSync(snPath);
    fse.writeFileSync(snPath, newText, 'utf-8')

    
})

if(repeatSn.length) {
    console.warn("转化合并完成，以下同名代码片段已自动覆盖:", repeatSn.join())
}

