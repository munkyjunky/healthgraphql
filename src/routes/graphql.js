const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const fetch = require('../helpers/fetch');
const UserType = require('../data-types/user');

module.exports = function (app) {

	app.use('/graphql', graphqlHTTP({
		graphiql: true,
		schema: new GraphQLSchema({
			query: UserType
		})
	}));

};