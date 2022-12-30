const path = require('path');

module.exports = {
	entry: {
		Users: {
			import: path.resolve(__dirname, 'index.js'),
			dependOn: ['Site']
		},
		UsersConsole: {
			import: path.resolve(__dirname, 'js/Console/index.js'),
			dependOn: ['Site', 'Console']
		},
		Login: {
			import: path.resolve(__dirname, 'js/Login/Login.js'),
			dependOn: 'Site'
		}
	}
}
