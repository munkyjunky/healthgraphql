const graphql = require('graphql');
const GraphQLEnumType = graphql.GraphQLEnumType;

module.exports = new GraphQLEnumType({
	name: 'MuscleTypes',
	values: {
		ABS: {value: 'Abs'},
		ARMS: {value: 'Arms'},
		BACK: {value: 'Back'},
		CHEST: {value: 'Chest'},
		LEGS: {value: 'Legs'},
		SHOULDERS: {value: 'Shoulders'}
	}
});