const {GraphQLString, GraphQLObjectType, GraphQLList} = require('graphql');
const i18n = require('../../helpers/i18n');
const HEALTHGRAPH = require('../../constants/healthgraph');
const Profile = require('../profile');
const {StrengthTrainingActivities} = require('../strength-training');
const {FitnessActivities} = require('../fitness-activites');
const {Records} = require('../records');
const nodeField = require('../node-interface').nodeField;

module.exports = new GraphQLObjectType({
	name: 'User',
	fields: {
		fitness_activities: {
			description: i18n.t('GRAPHQL.USER.FITNESS_ACTIVITIES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader
					.load(HEALTHGRAPH.ROOT)
					.then(data => context.healthGraphLoader.load(data.fitness_activities));
			},
			type: FitnessActivities
		},
		node: nodeField,
		profile: {
			description: i18n.t('GRAPHQL.USER.PROFILE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader
					.load(HEALTHGRAPH.ROOT)
					.then(data => context.healthGraphLoader.load(data.profile));
			},
			type: Profile
		},
		records: {
			resolve(parent, args, context) {
                return context.healthGraphLoader
                    .load(HEALTHGRAPH.ROOT)
                    .then(data => context.healthGraphLoader.load(data.records));
			},
			type: new GraphQLList(Records)
		},
		strength_training_activities: {
			description: i18n.t('GRAPHQL.USER.STRENGTH_TRAINING_ACTIVITIES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader
					.load(HEALTHGRAPH.ROOT)
					.then(data => context.healthGraphLoader.load(data.strength_training_activities));
			},
			type: StrengthTrainingActivities
		},
		userID: {
			description: i18n.t('GRAPHQL.USER.USERID'),
			resolve (parent, args, context) {
				return context.healthGraphLoader
					.load(HEALTHGRAPH.ROOT)
					.then(data => data.userID);
			},
			type: GraphQLString
		}
	}
});