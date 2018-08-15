const addCommit = require('../../utils.js');

let snippet = {
	"@axios_get_base": {
		"prefix": "@axios_get_base",
		"body": [
			"// Make a request for a user with a given ID",
			"axios.get('/user?ID=12345')",
			"  .then(function (response) {",
			"    console.log(response);",
			"  })",
			"  .catch(function (error) {",
			"    console.log(error);",
			"  });"
		],
		"description": "基本get"
	},
}

addCommit( snippet);
module.exports = snippet;