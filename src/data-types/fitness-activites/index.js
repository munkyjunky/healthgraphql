const {GraphQLString, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLBoolean} = require('graphql');
const CommentType = require('../comment');
const resolveItems = require('../../helpers/resolve-items');
const i18n = require('../../helpers/i18n');

const FitnessDistance = new GraphQLObjectType({
	name: 'Distance',
	fields: {
		distance: {
			description: i18n.t('GRAPHQL.FITNESS.DISTANCE.DISTANCE'),
			type: GraphQLInt
		},
		timestamp: {
			description: i18n.t('GRAPHQL.FITNESS.DISTANCE.TIMESTAMP'),
			type: GraphQLInt
		}
	}
});

const FitnessHeartRate = new GraphQLObjectType({
	name: 'Heart_Rate',
	fields: {
		heart_rate: {
			description: i18n.t('GRAPHQL.FITNESS.HEART_RATE.HEART_RATE'),
			type: GraphQLInt
		},
		timestamp: {
			description: i18n.t('GRAPHQL.FITNESS.HEART_RATE.TIMESTAMP'),
			type: GraphQLInt
		}
	}
});

const FitnessCalories = new GraphQLObjectType({
	name: 'Calories',
	fields: {
		calories: {
			description: i18n.t('GRAPHQL.FITNESS.CALORIES.CALORIES'),
			type: GraphQLInt
		},
		timestamp: {
			description: i18n.t('GRAPHQL.FITNESS.CALORIES.TIMESTAMP'),
			type: GraphQLInt
		}
	}
});

const FitnessPath = new GraphQLObjectType({
	name: 'Path',
	fields: {
		altitude: {
			description: i18n.t('GRAPHQL.FITNESS.PATH.ALTITUDE'),
			type: GraphQLInt
		},
		latitude: {
			description: i18n.t('GRAPHQL.FITNESS.PATH.LATITUDE'),
			type: GraphQLInt
		},
		longitude: {
			description: i18n.t('GRAPHQL.FITNESS.PATH.LONGITUDE'),
			type: GraphQLInt
		},
		timestamp: {
			description: i18n.t('GRAPHQL.FITNESS.PATH.TIMESTAMP'),
			type: GraphQLInt
		},
		type: {
			description: i18n.t('GRAPHQL.FITNESS.PATH.TYPE'),
			type: GraphQLString
		}
	}
});

const FitnessImage = new GraphQLObjectType({
	name: 'Image',
	fields: {
		latitude: {
			description: i18n.t('GRAPHQL.FITNESS.IMAGE.LATITUDE'),
			type: GraphQLInt
		},
		longitude: {
			description: i18n.t('GRAPHQL.FITNESS.IMAGE.LONGITUDE'),
			type: GraphQLInt
		},
		thumbnail_uri: {
			description: i18n.t('GRAPHQL.FITNESS.IMAGE.THUMBNAIL_URI'),
			type: GraphQLString
		},
		timestamp: {
			description: i18n.t('GRAPHQL.FITNESS.IMAGE.TIMESTAMP'),
			type: GraphQLInt
		},
		uri: {
			description: i18n.t('GRAPHQL.FITNESS.IMAGE.URI'),
			type: GraphQLString
		}
	}
});

const FitnessItem = new GraphQLObjectType({
	name: 'Item',
	fields: {
		activity: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.ACTIVITY'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.activity);
			},
			type: GraphQLString
		},
		average_heart_rate: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.AVERAGE_HEART_RATE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.average_heart_rate);
			},
			type: GraphQLInt
		},
		calories: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.CALORIES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.calories);
			},
			type: new GraphQLList(FitnessCalories)
		},
		climb: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.CLIMB'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.climb);
			},
			type: GraphQLInt
		},
		comments: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.COMMENTS'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => context.healthGraphLoader.load(d.comments)).then(c => c.comments);
			},
			type: new GraphQLList(CommentType)
		},
		distance: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.DISTANCE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.distance);
			},
			type: new GraphQLList(FitnessDistance)
		},
		duration: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.DURATION'),
			type: GraphQLInt
		},
		entry_mode: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.ENTRY_MODE'),
			type: GraphQLString
		},
		equipment: {

			description: i18n.t('GRAPHQL.FITNESS.ITEM.EQUIPMENT'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.equipment);
			},
			type: GraphQLString
		},
		has_path: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.HAS_PATH'),
			type: GraphQLBoolean
		},
		heart_rate: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.HEART_RATE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.heart_rate);
			},
			type: new GraphQLList(FitnessHeartRate)
		},
		images: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.IMAGES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.images);
			},
			type: new GraphQLList(FitnessImage)
		},
		is_live: {

			description: i18n.t('GRAPHQL.FITNESS.ITEM.IS_LIVE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.is_live);
			},
			type: GraphQLBoolean
		},
		notes: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.NOTES'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.notes);
			},
			type: GraphQLString
		},
		path: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.PATH'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.path);
			},
			type: new GraphQLList(FitnessPath)
		},
		secondary_type: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.SECONDARY_TYPE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.secondary_type);
			},
			type: GraphQLString
		},
		share: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.SHARE'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.share);
			},
			type: GraphQLString
		},
		share_map: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.SHARE_MAP'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.share_map);
			},
			type: GraphQLString
		},
		source: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.SOURCE'),
			type: GraphQLString
		},
		start_time: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.START_TIME'),
			type: GraphQLString
		},
		total_calories: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.TOTAL_CALORIES'),
			type: GraphQLInt
		},
		total_distance: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.TOTAL_DISTANCE'),
			type: GraphQLInt
		},
		tracking_mode: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.TRACKING_MODE'),
			type: GraphQLString
		},
		type: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.TYPE'),
			type: GraphQLString
		},
		userID: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.USERID'),
			resolve (parent, args, context) {
				return context.healthGraphLoader.load(parent.uri).then(d => d.userID);
			},
			type: GraphQLString
		},
		utc_offset: {
			description: i18n.t('GRAPHQL.FITNESS.ITEM.UTC_OFFSET'),
			type: GraphQLInt
		}
	}
});

const FitnessActivities = new GraphQLObjectType({
	name: 'Activities',
	fields: {
		size: {
			description: i18n.t('GRAPHQL.FITNESS.ACTIVITIES.SIZE'),
			type: GraphQLInt
		},
		items: {
			args: resolveItems.args,
			description: i18n.t('GRAPHQL.FITNESS.ACTIVITIES.ITEMS'),
			resolve: resolveItems.resolve,
			type: new GraphQLList(FitnessItem)
		}
	}
});

module.exports = {
	FitnessActivities,
	FitnessItem,
	FitnessCalories,
	FitnessDistance,
	FitnessHeartRate,
	FitnessImage,
	FitnessPath
};