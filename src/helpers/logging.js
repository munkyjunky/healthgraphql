const winston = require('winston');
const i18n = require('./i18n');

module.exports = {

	debug () {
		winston.log('debug', i18n.t(...Array.prototype.slice.call(arguments)));
	},

	error () {
		winston.log('error', i18n.t(...Array.prototype.slice.call(arguments)));
	},

	info () {
		winston.log('info', i18n.t(...Array.prototype.slice.call(arguments)));
	},

	silly () {
		winston.log('silly', i18n.t(...Array.prototype.slice.call(arguments)));
	},

	verbose () {
		winston.log('verbose', i18n.t(...Array.prototype.slice.call(arguments)));
	},

	warn () {
		winston.log('warn', i18n.t(...Array.prototype.slice.call(arguments)));
	}

};