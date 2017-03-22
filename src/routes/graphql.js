const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const UserType = require('../data-types/user');
const createLoader = require('../helpers/healthgraph-loader');
const StrengthTrainingType = require('../mutation-types/strength-training-activities');


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
							strength_training_activities: StrengthTrainingType
						}
					})
				})
			}
		})
	);

};