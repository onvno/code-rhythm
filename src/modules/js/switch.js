const addCommit = require('../../utils.js');

let snippet = {
	"@js_switch": {
		"prefix": "@js_switch",
		"body": [
			"switch(n) {",
			"    case 1:",
			"        // code content",
			"        break;",
			"    case 2:",
			"        // code content",
			"        break;",
			"    default:",
			"        // last code",
			"}"
		],
		"description": "switch"
	},
}

addCommit( snippet);
module.exports = snippet;