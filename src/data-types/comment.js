const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const i18n = require('../helpers/i18n');

module.exports = new GraphQLObjectType({
	name: 'Comment',
	fields: {
		comment: {
			description: i18n.t('GRAPHQL.COMMENT.COMMENT'),
			type: GraphQLString
		},
		name: {
			description: i18n.t('GRAPHQL.COMMENT.NAME'),
			type: GraphQLString
		},
		timestamp: {
			description: i18n.t('GRAPHQL.COMMENT.TIMESTAMP'),
			type: GraphQLString
		},
		userID: {
			description: i18n.t('GRAPHQL.COMMENT.USERID'),
			type: GraphQLString
		}
	}
});