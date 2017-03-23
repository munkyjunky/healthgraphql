const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const UserType = require('../data-types/user');
const createLoader = require('../helpers/healthgraph-loader');
const createStrengthItem = require('../mutations/strength-training/create-item');

module.exports = function (app) {

	app.use('/graphql', graphqlHTTP(req => {

		const access_token = req.cookies.auth;
		const healthGraphLoader = createLoader(access_token);

		return {
				context: {
					access_token,
					healthGraphLoader
				},
				graphiql: true,
				schema: new GraphQLSchema({
					query: UserType,
					mutation: new graphql.GraphQLObjectType({
						name: 'healthgraph',
						fields: {
							create_strength_activity: createStrengthItem
						}
					})
				})
			}
		})
	);

};