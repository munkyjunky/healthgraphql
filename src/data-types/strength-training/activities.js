const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const resolveItems = require('../../helpers/resolve-items');
const i18n = require('../../helpers/i18n');
const StrengthTrainingItem = require('./item');

module.exports = new GraphQLObjectType({
	name: 'StrengthTrainingActivities',
	fields: {
		size: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ACTIVITIES.SIZE'),
			type: GraphQLInt
		},
		items: {
			args: resolveItems.args,
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ACTIVITIES.ITEMS'),
			resolve: resolveItems.resolve,
			type: new GraphQLList(StrengthTrainingItem)
		}
	}
});