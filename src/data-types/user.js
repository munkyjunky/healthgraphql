const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const i18n = require('../helpers/i18n');
const fetch = require('../helpers/fetch');
const ProfileType = require('./profile');
const StrengthTrainingActivitiesType = require('./strength-training-activities').StrengthTrainingActivities;
const FitnessActivitiesType = require('./fitness-activities').FitnessActivities;

module.exports = new GraphQLObjectType({
	name: 'User',
	fields: {
		fitness_activities: {
			description: i18n.t('GRAPHQL.USER.FITNESS_ACTIVITIES'),
			resolve (parent, args, req) {
				return fetch('/user', req).then(data => fetch(data.fitness_activities, req));
			},
			type: FitnessActivitiesType
		},
		profile: {
			description: i18n.t('GRAPHQL.USER.PROFILE'),
			resolve (parent, args, req) {
				return fetch('/user', req).then(data => fetch(data.profile, req));
			},
			type: ProfileType
		},
		strength_training_activities: {
			description: i18n.t('GRAPHQL.USER.STRENGTH_TRAINING_ACTIVITIES'),
			resolve (parent, args, req) {
				return fetch('/user', req).then(data => fetch(data.strength_training_activities, req));
			},
			type: StrengthTrainingActivitiesType
		},
		userID: {
			description: i18n.t('GRAPHQL.USER.USERID'),
			resolve (parent, args, req) {
				return fetch('/user', req).then(data => data.userID);
			},
			type: GraphQLString
		}
	}
});