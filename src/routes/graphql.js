const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const fetch = require('../helpers/fetch');

const HealthGraphType = require('../data-types/user');

module.exports = function (app) {

	app.use('/graphql', graphqlHTTP({
		graphiql: true,
		schema: new GraphQLSchema({
			query: new GraphQLObjectType({
				name: 'HealthGraph',
				fields: {
					healthgraph: {
						type: HealthGraphType,
						resolve (parent, args, req) {
							return fetch('/user', req);
						}
					}
				}
			})
		})

	}));

};