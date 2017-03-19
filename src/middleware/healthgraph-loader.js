const request = require('superagent-promise')(require('superagent'), Promise);
const DataLoader = require('dataloader');
const log = require('./../helpers/logging');

module.exports = function createLoader (req, res, next) {

	const HealthGraphLoader = new DataLoader(
		urls => Promise.all(urls.map(uri => {

			log.info('HEALTHGRAPH_REQUEST', {uri});

			return request
				.get(`https://api.runkeeper.com${uri}`)
				.query({
					access_token: req.cookies.auth
				})
				.end()
				.then(data => data.body);

		}))
	);

	req.healthGraphLoader = HealthGraphLoader; // eslint-disable-line no-param-reassign

	next();

};