const fse = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const util = require('../src/utils.js');
const { filterMenu } = util;

const MODULE_PATH = path.join(__dirname, 'modules');
const BUILD_PATH = path.resolve(__dirname, 'build');

// 此处需要处理下
// 最后一行 为`,`的情况
// body数组最后 为`,`的情况
const files = filterMenu(fse.readdirSync(MODULE_PATH));
files.map((file) => {
    const suffixIndex = file.lastIndexOf('.');
    
    const fileName = file.slice(0, suffixIndex)
    const fileNameClean = fileName.replace(/\//g, '_'); // 处理文件名中包含路径

    const filePath = path.join(MODULE_PATH, file);

    const snCont = fse.readFileSync(filePath, 'utf-8');
    const snJSON = JSON.parse(snCont);
    const snNames = Object.keys(snJSON);
    
    snNames.map(snName => {
        const snCont = [];
        snJSON[snName].body = snJSON[snName].body.join('\n');
        snCont.push(snJSON[snName]);
        const yamlCont = yaml.safeDump(snCont, {
            indent: 4,
        });

        const snNameClean = snName.replace(/\//g, '_'); // 处理文件名中包含路径
        const snPath = path.join(BUILD_PATH, `${fileNameClean}/${snNameClean}.yaml`)
        fse.ensureFileSync(snPath);
        fse.writeFileSync(snPath, yamlCont, 'utf-8')
    })
})

