const vscode = require('vscode');
const process = require('process');
const fs = require('fs');
const path = require('path');
const os = require('os');

let deleteSnippets = require('./utils/deleteSnippets');
let vsCodeUserSnippetPath = require('./utils/snippetPath');
let version = require('./version.js').version;
version = version.split('.').join('-');


/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.access(dist, function(err){
        if(err){
        // 目录不存在时创建目录
        fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if(err){
            callback(err);
        } else {
        fs.readdir(src, function(err, paths) {
            if(err){
            callback(err)
            } else {
                paths.forEach(function(path) {
                    if(path.indexOf('code-snippets') > 0){
                        let pathJoin = path.replace('.', `-${version}.`);

                        var _src = src + '/' + path;
                        var _dist = dist + '/' + pathJoin;
                        fs.stat(_src, function(err, stat) {
                            if(err){
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if(stat.isFile()) {
                                    if (!fs.existsSync(_dist)){
                                        fs.writeFileSync(_dist, fs.readFileSync(_src));
                                    } else {
                                        console.log('已经存在');
                                    }
                                } else if(stat.isDirectory()) {
                                    // 目录递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    }
                })
            }
        })
        }
    }
}



function activate(context) {
    // 获取插件目录 - 以备后续可能用到
    // console.log(vscode.extensions.getExtension ("HookyQR.beautify").extensionPath);

    // 读写snippet
    let srcDir = path.resolve(__dirname, './snippets')
    copyDir(srcDir, vsCodeUserSnippetPath, (err)=> {
        if(err){
            console.log(err);
        }
        console.log('coping!');
    })

    console.log('Congratulations, your extension "code-rhythm" is now active!');

    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
    deleteSnippets();
    return true
}
exports.deactivate = deactivate;