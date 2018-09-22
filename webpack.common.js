const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
	entry: {
		Users: path.resolve(__dirname, 'index.js'),
		UsersConsole: path.resolve(__dirname, 'js/Console/index.js'),
		Login: path.resolve(__dirname, 'js/Login/Login.js')
	},
	plugins: [
		new FileManagerPlugin({
			onEnd: {
				copy: [
					{source: path.resolve(__dirname, '../../../cl/dist/users.*'), destination: path.resolve(__dirname, 'dist') },
					{source: path.resolve(__dirname, '../../../cl/dist/usersconsole.*'), destination: path.resolve(__dirname, 'dist') },
					{source: path.resolve(__dirname, '../../../cl/dist/login.*'), destination: path.resolve(__dirname, 'dist') }
				]
			}
		})
	]
}
