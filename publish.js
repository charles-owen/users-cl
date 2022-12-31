const path = require('path');

module.exports = {
	dist: path.resolve(__dirname, 'dist'),
	files: [
		'^users\\.js',
		'^usersconsole\\.js',
		'^login\\.js'
	]
}