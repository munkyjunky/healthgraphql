const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLBoolean = graphql.GraphQLBoolean;
const i18n = require('../helpers/i18n');

module.exports = new GraphQLObjectType({
	name: 'Profile',
	fields: {
		athlete_type: {
			description: i18n.t('GRAPHQL.PROFILE.ATHLETE_TYPE'),
			type: GraphQLString
		},
		birthday: {
			description: i18n.t('GRAPHQL.PROFILE.BIRTHDAY'),
			type: GraphQLString
		},
		elite: {
			description: i18n.t('GRAPHQL.PROFILE.ELITE'),
			type: GraphQLBoolean
		},
		gender: {
			description: i18n.t('GRAPHQL.PROFILE.GENDER'),
			type: GraphQLString
		},
		large_picture: {
			description: i18n.t('GRAPHQL.PROFILE.LARGE_PICTURE'),
			type: GraphQLString
		},
		location: {
			description: i18n.t('GRAPHQL.PROFILE.LOCATION'),
			type: GraphQLString
		},
		medium_picture: {
			description: i18n.t('GRAPHQL.PROFILE.MEDIUM_PICTURE'),
			type: GraphQLString
		},
		name: {
			description: i18n.t('GRAPHQL.PROFILE.NAME'),
			type: GraphQLString
		},
		normal_picture: {
			description: i18n.t('GRAPHQL.PROFILE.NORMAL_PICTURE'),
			type: GraphQLString
		},
		profile: {
			description: i18n.t('GRAPHQL.PROFILE.PROFILE'),
			type: GraphQLString
		},
		small_picture: {
			description: i18n.t('GRAPHQL.PROFILE.SMALL_PICTURE'),
			type: GraphQLString
		}
	}
});