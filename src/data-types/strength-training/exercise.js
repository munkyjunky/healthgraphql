const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLObjectType = graphql.GraphQLObjectType;
const StrengthTrainingSet = require('./set');
const i18n = require('../../helpers/i18n');

module.exports = new GraphQLObjectType({
	name: 'StrengthTrainingExercise',
	fields: {
		notes: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.NOTES'),
			type: GraphQLString
		},
		primary_muscle_group: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_MUSCLE_GROUP'),
			type: GraphQLString
		},
		primary_type: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_TYPE'),
			type: GraphQLString
		},
		routine: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.ROUTINE'),
			type: GraphQLString
		},
		secondary_muscle_group: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SECONDARY_MUSCLE_GROUP'),
			type: GraphQLString
		},
		secondary_type: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SECONDARY_TYPE'),
			type: GraphQLString
		},
		sets: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SETS'),
			type: new GraphQLList(StrengthTrainingSet)
		}
	}
});