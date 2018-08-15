const addCommit = require('../../utils.js');

let snippet = {
	"@js_promise": {
		"prefix": "@js_promise",
		"body": [
			"var ${name} = new Promise((resolve,reject)=>{",
			"    if (condition) {",
			"        resolve(val);",
			"    } else {",
			"        reject(err);",
			"    }",
			"})",
			"${name}",
			"  .then(step2)",
			"  .then(step3)",
			"  .catch((err)=>{console.log(err)})"
		],
		"description": "promise"
	},
}

addCommit( snippet);
module.exports = snippet;