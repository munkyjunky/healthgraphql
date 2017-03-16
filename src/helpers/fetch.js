const request = require('superagent-promise')(require('superagent'), Promise);

module.exports = function fetch (endpoint, req) {
	return request
		.get(`https://api.runkeeper.com${endpoint}`)
		.query({access_token: req.cookies.auth})
		.end()
		.then(data => data.body);
};