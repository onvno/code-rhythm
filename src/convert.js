const yaml = require('js-yaml');
const fse   = require('fs-extra');
const path = require('path');
const util = require('./utils.js');

const { filterMenu, handleCommit, buildBodyFromText } = util;
const MODULE_PATH = path.join(__dirname, 'modules');
const BASE_PATH = path.join(__dirname, '');

/**
 * 1. 读取目录
 * 2. 处理yaml文件
 * 3. 增加注释
 * 4. 文件合并输出
 */

let folders = filterMenu(fse.readdirSync(`${MODULE_PATH}`));

folders.map( folder => {
    const files = filterMenu(fse.readdirSync(`${MODULE_PATH}/${folder}`))
    let sn = {};

    files.map( file => {
        const part = yaml.safeLoad(fse.readFileSync(`${MODULE_PATH}/${folder}/${file}`, 'utf8'))
        const bodyCode = buildBodyFromText(part.body);
        const bodyCont = handleCommit(bodyCode, part.prefix);

        sn[part.prefix] = {
            prefix: part.prefix,
            body: bodyCont,
            description: part.description
        }
    })

    const newText = JSON.stringify(sn, null, '\t');
    fse.ensureFileSync(`${BASE_PATH}/build/@${folder}.code-snippets`);
    fse.writeFileSync(`${BASE_PATH}/build/@${folder}.code-snippets`, newText, 'utf-8')
})
