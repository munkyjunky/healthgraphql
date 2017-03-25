const fromGlobalId = require('graphql-relay').fromGlobalId;
const nodeDefinitions = require('graphql-relay').nodeDefinitions;

const { nodeInterface, nodeField } = nodeDefinitions(
	(globalId, context) => {
		const { type, id } = fromGlobalId(globalId);
		return context.healthGraphLoader.load(id);
	},
	object => {
		if (object.hasOwnProperty('exercises')) {
			return 'StrengthTrainingItem';
		}
	}
);

module.exports = { nodeField, nodeInterface };