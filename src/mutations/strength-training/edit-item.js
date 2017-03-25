const HEALTHGRAPH = require('../../constants/healthgraph');
const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const GraphQLInputObjectType = graphql.GraphQLInputObjectType;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLList = graphql.GraphQLList;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLID = graphql.GraphQLID;
const i18n = require('../../helpers/i18n');
const fromGlobalId = require('graphql-relay').fromGlobalId;
const request = require('superagent-promise')(require('superagent'), Promise);
const StrengthTrainingItem = require('../../data-types/strength-training/item');
const MuscleTypes = require('../../data-types/strength-training/muscle-types');
const ExerciseTypes = require('../../data-types/strength-training/exercise-types');


module.exports = {

	args: {
		exercises: {
			type: new GraphQLList(new GraphQLInputObjectType({
				name: 'StrengthTrainingEditableExerciseMutation',
				fields: {
					notes: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.NOTES'),
						type: GraphQLString
					},
					primary_muscle_group: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_MUSCLE_GROUP'),
						type: MuscleTypes
					},
					primary_type: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_TYPE'),
						type: ExerciseTypes
					},
					routine: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.ROUTINE'),
						type: GraphQLString
					},
					secondary_muscle_group: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SECONDARY_MUSCLE_GROUP'),
						type: MuscleTypes
					},
					secondary_type: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SECONDARY_TYPE'),
						type: GraphQLString
					},
					sets: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SETS'),
						type: new GraphQLList(new GraphQLInputObjectType({
							name: 'StrengthTrainingEditableSetMutation',
							fields: {
								notes: {
									description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.NOTES'),
									type: GraphQLString
								},
								repetitions: {
									description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.REPETITIONS'),
									type: GraphQLInt
								},
								weight: {
									description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.WEIGHT'),
									type: GraphQLFloat
								}
							}
						}))
					}
				}
			}))
		},
		id: {type: new GraphQLNonNull(GraphQLID)},
		notes: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.NOTES'),
			type: GraphQLString
		},
		post_to_facebook: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.POST_TO_FACEBOOK'),
			type: GraphQLBoolean
		},
		post_to_twitter: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.POST_TO_TWITTER'),
			type: GraphQLBoolean
		},
		start_time: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.START_TIME'),
			type: GraphQLString
		},
		total_calories: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.TOTAL_CALORIES'),
			type: GraphQLFloat
		}
	},

	resolve (rootVal, args, context) {

		const {id} = fromGlobalId(args.id);

		return request
			.put(`${HEALTHGRAPH.BASE_URL}${id}`)
			.type(HEALTHGRAPH.CONTENT_TYPES.strength_training_activities)
			.query({access_token: context.access_token})
			.send(Object.assign(args, args.start_time ? {
					start_time: new Date(args.start_time).toGMTString()
				} : {}))
			.end()
			.then((res) =>
				// fetch the newly saved response
				context.healthGraphLoader.load(id)
			)

	},

	type: StrengthTrainingItem

};