const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;

const fetch = require('../helpers/fetch');
const ProfileType = require('./profile');
const StrengthTrainingActivitiesType = require('./strength-training-activities');

module.exports = new GraphQLObjectType({
	name: 'User',
	fields: {
		userID: {
			type: GraphQLString
		},
		profile: {
			type: ProfileType,
			resolve (data, args, req) {
				return fetch(data.profile, req);
			}
		},
		strength_training_activities: {
			type: StrengthTrainingActivitiesType,
			resolve (data, args, req) {
				return fetch(data.strength_training_activities, req);
			}
		}
	}
});