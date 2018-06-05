const process = require('process');
const fs = require('fs');
const path = require('path');

let version = require('../version.js').version;
version = version.split('.').join('-');

let vsCodeUserSnippetPath = require('../utils/snippetPath');

const snippetFiles = fs.readdirSync(vsCodeUserSnippetPath);

const reg = /^@\w+(-[0-9]){3}\.code-snippets$/;

const deleteSnippet = () => {
    snippetFiles.map((item, index) => {
        if(reg.test(item)) {
            const snippetFilePath = path.resolve(vsCodeUserSnippetPath, item);
            fs.unlinkSync(snippetFilePath);
        }
    })
}

module.exports = deleteSnippet;
