const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLObjectType = graphql.GraphQLObjectType;
const StrengthTrainingExercise = require('./exercise');
const CommentType = require('../comment');
const i18n = require('../../helpers/i18n');
const nodeInterface = require('../node-interface').nodeInterface;
const toGlobalId = require('graphql-relay').toGlobalId;
const globalIdTypes = require('../../constants/global-id-types');

module.exports = new GraphQLObjectType({
	name: 'StrengthTrainingItem',
	fields: {
		comments: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.COMMENTS'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri)
					.then(d => context.healthGraphLoader.load(d.comments))
					.then(c => c.comments);
			},
			type: new GraphQLList(CommentType)
		},
		exercises: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.EXERCISES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.exercises);
			},
			type: new GraphQLList(StrengthTrainingExercise)
		},
		id: {
			resolve (parent) {
				return toGlobalId(globalIdTypes.strength_training_activities, parent.uri);
			},
			type: new graphql.GraphQLNonNull(graphql.GraphQLID)
		},
		notes: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.NOTES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.notes);
			},
			type: GraphQLString
		},
		source: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.SOURCE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.source);
			},
			type: GraphQLString
		},
		start_time: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.START_TIME'),
			type: GraphQLString
		},
		total_calories: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.TOTAL_CALORIES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.total_calories);
			},
			type: GraphQLFloat
		},
		userID: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.USERID'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.userID);
			},
			type: GraphQLInt
		}
	},
	interfaces: [ nodeInterface ]
});