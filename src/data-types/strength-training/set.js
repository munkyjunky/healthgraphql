const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLObjectType = graphql.GraphQLObjectType;
const i18n = require('../../helpers/i18n');

module.exports = new GraphQLObjectType({
	name: 'StrengthTrainingSet',
	fields: {
		notes: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.NOTES'),
			type: GraphQLString
		},
		repetitions: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.REPETITIONS'),
			type: GraphQLInt
		},
		weight: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.WEIGHT'),
			type: GraphQLFloat
		}
	}
});