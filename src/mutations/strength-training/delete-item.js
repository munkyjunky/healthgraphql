const graphql = require('graphql');
const {fromGlobalId} = require('graphql-relay');
const request = require('superagent-promise')(require('superagent'), Promise);
const HEALTHGRAPH = require('../../constants/healthgraph');

module.exports = {

	args: {
		id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) }
	},

	resolve (rootVal, args, context) {
		const {id} = fromGlobalId(args.id);

		return request
			.del(`${HEALTHGRAPH.BASE_URL}${id}`)
			.query({access_token: context.access_token})
			.end()
			.then(() => ({ id: args.id }));
	},

	type: new graphql.GraphQLObjectType({
		name: 'DeleteStrengthItem',
		fields: {
			id: { type: graphql.GraphQLID }
		}
	})

};