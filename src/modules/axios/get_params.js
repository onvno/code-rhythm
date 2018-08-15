const addCommit = require('../../utils.js');

let snippet = {
	"@axios_get_params": {
		"prefix": "@axios_get_params",
		"body": [
			"axios.get('/user', {",
			"    params: {",
			"      ID: 12345",
			"    }",
			"  })",
			"  .then(function (response) {",
			"    console.log(response);",
			"  })",
			"  .catch(function (error) {",
			"    console.log(error);",
			"  });"
		],
		"description": "get参数形式"
	},
}

addCommit( snippet);
module.exports = snippet;