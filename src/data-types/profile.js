const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;

module.exports = new GraphQLObjectType({
	name: 'Profile',
	fields: {
		name: { type: GraphQLString },
		location: { type: GraphQLString },
		athlete_type: { type: GraphQLString },
		gender: { type: GraphQLString },
		birthday: { type: GraphQLString },
		elite: { type: GraphQLBoolean },
		profile: { type: GraphQLString },
		small_picture: { type: GraphQLString },
		normal_picture: { type: GraphQLString },
		medium_picture: { type: GraphQLString },
		large_picture: { type: GraphQLString }
	}
});