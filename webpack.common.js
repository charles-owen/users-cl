const path = require('path');

module.exports = {
	entry: {
		Users: path.resolve(__dirname, 'index.js'),
		UsersConsole: path.resolve(__dirname, 'js/Console/index.js'),
		Login: path.resolve(__dirname, 'js/Login/Login.js')
	}
}
