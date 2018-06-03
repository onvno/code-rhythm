// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const process = require('process');
const fs = require('fs');
const path = require('path');
const os = require('os');
let version = require('./version.js').version;
version = version.split('.').join('-');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

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
                        // const version = '0-0-1';
                        let pathJoin = path.replace('.', `-${version}.`);
                        
                        // console.log("path:::", path);
                        // console.log("pathJoin:", pathJoin);

                        var _src = src + '/' +path;
                        var _dist = dist + '/' +pathJoin;
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
                                // 当是目录是，递归复制
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
    // console.log("vscode:", vscode.env.appRoot);

    // 读写snippet
    const osName = os.type();
    let vsCodeUserSettingsPath;
    let delimiter = "/";
    switch (osName) {
        case ("Darwin"): {
            vsCodeUserSettingsPath = process.env.HOME + "/Library/Application Support/Code/User/snippets/";
            break;
        }
        case ("Linux"): {
            vsCodeUserSettingsPath = process.env.HOME + "/.config/Code/User/snippets/";
            break;
        }
        case ("Windows_NT"): {
            vsCodeUserSettingsPath = process.env.APPDATA + "\\Code\\User\\snippets\\";
            delimiter = "\\";
            break;
        }
        default: {
            //BSD?
            vsCodeUserSettingsPath = process.env.HOME + "/.config/Code/User/snippets/";
            break;
        }
    }
    // console.log("vsCodeUserSettingsPath:", vsCodeUserSettingsPath);
    let srcDir = path.resolve(__dirname, './snippets')
    // console.log("srcDir:", srcDir);
    copyDir(srcDir, vsCodeUserSettingsPath, (err)=> {
        if(err){
            console.log(err);
        }
        console.log('coping!');
    })


    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // ExtensionContext
    console.log('Congratulations, your extension "@code" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;