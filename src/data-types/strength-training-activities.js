const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const CommentType = require('./comment');
const resolveItems = require('../helpers/resolve-items');
const i18n = require('../helpers/i18n');

const StrengthTrainingSet = new GraphQLObjectType({
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
			type: GraphQLInt
		}
	}
});

const StrengthTrainingExercise = new GraphQLObjectType({
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

const StrengthTrainingItem = new GraphQLObjectType({
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
			type: GraphQLInt
		},
		userID: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.USERID'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.userID);
			},
			type: GraphQLString
		}
	}
});


const StrengthTrainingActivities = new GraphQLObjectType({
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

module.exports = {
	StrengthTrainingActivities,
	StrengthTrainingItem
};