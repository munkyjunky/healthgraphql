const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLBoolean = graphql.GraphQLBoolean;
const CommentType = require('./comment');
const fetch = require('../helpers/fetch');
const resolveItems = require('../helpers/resolve-items');

const FitnessDistance = new GraphQLObjectType({
	name: 'Distance',
	fields: {
		timestamp: {type: GraphQLInt},
		distance: {type: GraphQLInt}
	}
});

const FitnessHeartRate = new GraphQLObjectType({
	name: 'HeartRate',
	fields: {
		timestamp: {type: GraphQLInt},
		heart_rate: {type: GraphQLInt}
	}
});

const FitnessCalories = new GraphQLObjectType({
	name: 'Calories',
	fields: {
		timestamp: {type: GraphQLInt},
		calories: {type: GraphQLInt}
	}
});

const FitnessPath = new GraphQLObjectType({
	name: 'Path',
	fields: {
		timestamp: {type: GraphQLInt},
		latitude: {type: GraphQLInt},
		longitude: {type: GraphQLInt},
		altitude: {type: GraphQLInt},
		type: {type: GraphQLString}
	}
});

const FitnessImage = new GraphQLObjectType({
	name: 'Image',
	fields: {
		timestamp: {type: GraphQLInt},
		latitude: {type: GraphQLInt},
		longitude: {type: GraphQLInt},
		uri: {type: GraphQLString},
		thumbnail_uri: {type: GraphQLString}
	}
});

const FitnessItem = new GraphQLObjectType({
	name: 'FitnessItem',
	fields: {
		userID: {
			type: GraphQLString,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.userID);
			}
		},
		type: {type: GraphQLString},
		secondary_type: {
			type: GraphQLString,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.secondary_type);
			}
		},
		equipment: {
			type: GraphQLString,
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.equipment);
			}
		},
		start_time: {type: GraphQLString},
		utc_offset: {type: GraphQLInt},
		total_distance: {type: GraphQLInt},
		distance: {
			type: new GraphQLList(FitnessDistance),
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.distance);
			}
		},
		duration: {type: GraphQLInt},
		average_heart_rate: {
			type: GraphQLInt, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.average_heart_rate);
			}
		},
		heart_rate: {
			type: new GraphQLList(FitnessHeartRate), resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.heart_rate);
			}
		},
		total_calories: {type: GraphQLInt},
		calories: {
			type: new GraphQLList(FitnessCalories), resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.calories);
			}
		},

		climb: {
			type: GraphQLInt, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.climb);
			}
		},
		notes: {
			type: GraphQLString, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.notes);
			}
		},
		is_live: {
			type: GraphQLBoolean, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.is_live);
			}
		},

		path: {
			type: new GraphQLList(FitnessPath), resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.path);
			}
		},
		images: {
			type: new GraphQLList(FitnessImage), resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.images);
			}
		},

		share: {
			type: GraphQLString, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.share);
			}
		},
		share_map: {
			type: GraphQLString, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.share_map);
			}
		},
		source: {type: GraphQLString},
		entry_mode: {type: GraphQLString},
		tracking_mode: {type: GraphQLString},
		has_path: {type: GraphQLBoolean},
		activity: {
			type: GraphQLString, resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => d.activity);
			}
		},
		comments: {
			type: new GraphQLList(CommentType),
			resolve (parent, args, req) {
				return fetch(parent.uri, req).then(d => fetch(d.comments, req)).then(c => c.comments);
			}
		}
	}
});

const FitnessActivities = new GraphQLObjectType({
	name: 'FitnessActivities',
	fields: {
		size: {type: GraphQLInt},
		items: {
			type: new GraphQLList(FitnessItem),
			args: resolveItems.args,
			resolve: resolveItems.resolve
		}
	}
});

module.exports = {
	FitnessItem,
	FitnessActivities
};