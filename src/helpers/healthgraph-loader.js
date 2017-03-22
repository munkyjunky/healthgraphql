const request = require('superagent-promise')(require('superagent'), Promise);
const DataLoader = require('dataloader');
const log = require('./logging');
const HEALTHGRAPH = require('../constants/healthgraph');

module.exports = function createLoader (access_token) {

	return new DataLoader(
		urls => Promise.all(urls.map(uri => {

			log.info('HEALTHGRAPH_REQUEST', {uri});

			return request
				.get(`${HEALTHGRAPH.BASE_URL}${uri}`)
				.query({
					access_token
				})
				.end()
				.then(data => data.body);

		}))
	);

};