const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const UserType = require('../data-types/user');
const createLoader = require('../helpers/healthgraph-loader');
module.exports = function (app) {

	app.use('/graphql', graphqlHTTP(req => {

		const healthGraphLoader = createLoader(req);

		return {
				context: {
					healthGraphLoader
				},
				graphiql: true,
				schema: new GraphQLSchema({
					query: UserType
				})
			}
		})
	);

};