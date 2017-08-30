const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const UserType = require('./data-types/user');
const createLoader = require('./helpers/healthgraph-loader');
const createStrengthItem = require('./mutations/strength-training/create-item');
const deleteStrengthItem = require('./mutations/strength-training/delete-item');
const editStrengthItem = require('./mutations/strength-training/edit-item');

const DEFAULTS = {
	getAccessToken (req) { return req.headers.authorization || req.params.access_token },
	graphiql: process.env.NODE_ENV !== 'production'
};

/**
 *
 * @param {object} options - Configuration object
 * @param {boolean} [options.graphiql=false] - Enable graphiql interface
 * @param {function} options.getAccessToken - Function to get the access token to be used for the request to the Healthgraph
 * @returns {*}
 */
module.exports = function (options = {}) {

	const opts = Object.assign(DEFAULTS, options);

	return graphqlHTTP(req => {

		const access_token = opts.getAccessToken(req);
		const healthGraphLoader = createLoader(access_token);

		return {
			context: {
				access_token,
				healthGraphLoader
			},
			graphiql: opts.graphiql,
			schema: new GraphQLSchema({
				query: UserType,
				mutation: new graphql.GraphQLObjectType({
					name: 'healthgraph',
					fields: {
						create_strength_activity: createStrengthItem,
						delete_strength_activity: deleteStrengthItem,
						edit_strength_activity: editStrengthItem
					}
				})
			})
		}
	});

};