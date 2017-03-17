const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLBoolean = graphql.GraphQLBoolean;

const resolveItems = require('../helpers/resolve-items');
const resolve = resolveItems.resolve;
const args = resolveItems.args;

const FitnessItem = new GraphQLObjectType({
	name: 'FitnessItem',
	fields: {
		type: {type: GraphQLString},
		start_time: {type: GraphQLString},
		utc_offset: {type: GraphQLInt},
		total_distance: {type: GraphQLInt},
		duration: {type: GraphQLInt},
		total_calories: {type: GraphQLInt},
		source: {type: GraphQLString},
		entry_mode: {type: GraphQLString},
		tracking_mode: {type: GraphQLString},
		has_path: {type: GraphQLBoolean},
		uri: {type: GraphQLString}
	}
});

module.exports = new GraphQLObjectType({
	name: 'FitnessActivities',
	fields: {
		size: {type: GraphQLInt},
		items: {
			type: new GraphQLList(FitnessItem),
			args,
			resolve
		}
	}
});