const request = require('superagent-promise')(require('superagent'), Promise);
const log = require('./logging');

module.exports = function fetch (endpoint, req) {

	log.info('RUNKEEPER_REQUEST', { endpoint });

	return request
		.get(`https://api.runkeeper.com${endpoint}`)
		.query({access_token: req.cookies.auth})
		.end()
		.then(data => data.body);
};