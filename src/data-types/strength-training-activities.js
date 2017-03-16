const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const fetch = require('../helpers/fetch');

const StrengthTrainingSet = new GraphQLObjectType({
	name: 'StrengthTrainingSet',
	fields: {
		weight: { type: GraphQLInt },
		repetitions: { type: GraphQLInt },
		notes: { type: GraphQLString}
	}
});

const StrengthTrainingExercise = new GraphQLObjectType({
	name: 'StrengthTrainingExercise',
	fields: {
		primary_type: { type: GraphQLString },
		secondary_type: { type: GraphQLString },
		primary_muscle_group: { type: GraphQLString },
		secondary_muscle_group: { type: GraphQLString },
		routine: { type: GraphQLString },
		notes: { type: GraphQLString },
		sets: { type: new GraphQLList(StrengthTrainingSet) }
	}
});

const StrengthTrainingItem = new GraphQLObjectType({
	name: 'StrengthTrainingItem',
	fields: {
		start_time: { type: GraphQLString },
		uri: { type: GraphQLString },
		userID: {
			type: GraphQLString,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.userID);
			}
		},
		total_calories: {
			type: GraphQLInt,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.total_calories);
			}
		},
		notes: {
			type: GraphQLString,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.notes);
			}
		},
		source: {
			type: GraphQLString,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.source);
			}
		},
		exercises: {
			type: new GraphQLList(StrengthTrainingExercise),
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.exercises);
			}
		}
	}
});


module.exports = new GraphQLObjectType({
	name: 'StrengthTrainingActivities',
	fields: {
		size: { type: GraphQLInt },
		items: {
			type: new GraphQLList(StrengthTrainingItem)
		}
	}
});