const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

module.exports = new GraphQLObjectType({
	name: 'Comment',
	fields: {
		timestamp: { type: GraphQLString },
		userID: { type: GraphQLString },
		name: { type: GraphQLString },
		comment: { type: GraphQLString }
	}
});