const os = require('os');
const process = require('process');

const osName = os.type();
let vsCodeUserSnippetPath;
let delimiter = "/";
switch (osName) {
    case ("Darwin"): {
        vsCodeUserSnippetPath = process.env.HOME + "/Library/Application Support/Code/User/snippets/";
        break;
    }
    case ("Linux"): {
        vsCodeUserSnippetPath = process.env.HOME + "/.config/Code/User/snippets/";
        break;
    }
    case ("Windows_NT"): {
        vsCodeUserSnippetPath = process.env.APPDATA + "\\Code\\User\\snippets\\";
        delimiter = "\\";
        break;
    }
    default: {
        //BSD?
        vsCodeUserSnippetPath = process.env.HOME + "/.config/Code/User/snippets/";
        break;
    }
}

module.exports = vsCodeUserSnippetPath;