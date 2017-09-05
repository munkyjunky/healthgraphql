const HEALTHGRAPH = require('../../constants/healthgraph');
const {GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType, GraphQLBoolean} = require('graphql');
const i18n = require('../../helpers/i18n');
const request = require('superagent-promise')(require('superagent'), Promise);
const {StrengthTrainingItem} = require('../../data-types/strength-training');
const MuscleTypes = require('../../data-types/strength-training/muscle-types');
const ExerciseTypes = require('../../data-types/strength-training/exercise-types');

module.exports = {

	args: {
		exercises: {
			type: new GraphQLNonNull(new GraphQLList(new GraphQLInputObjectType({
				name: 'StrengthTrainingExerciseMutation',
				fields: {
					notes: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.NOTES'),
						type: GraphQLString
					},
					primary_muscle_group: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_MUSCLE_GROUP'),
						type: new GraphQLNonNull(MuscleTypes)
					},
					primary_type: {
						description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_TYPE'),
						type: new GraphQLNonNull(ExerciseTypes)
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
						type: new GraphQLNonNull(new GraphQLList(new GraphQLInputObjectType({
							name: 'StrengthTrainingSetMutation',
							fields: {
								notes: {
									description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.NOTES'),
									type: GraphQLString
								},
								repetitions: {
									description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.REPETITIONS'),
									type: new GraphQLNonNull(GraphQLInt)
								},
								weight: {
									description: i18n.t('GRAPHQL.STRENGTH_TRAINING.SET.WEIGHT'),
									type: new GraphQLNonNull(GraphQLFloat)
								}
							}
						})))
					}
				}
			})))
		},
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
			type: new GraphQLNonNull(GraphQLString)
		},
		total_calories: {
			description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.TOTAL_CALORIES'),
			type: GraphQLFloat
		}
	},

	resolve (rootVal, args, context) {
		return context.healthGraphLoader
			.load(HEALTHGRAPH.ROOT)
			.then(data => request
				.post(`${HEALTHGRAPH.BASE_URL}${data.strength_training_activities}`)
				.type(HEALTHGRAPH.CONTENT_TYPES.new_strength_training_activities)
				.query({access_token: context.access_token})
				.send(Object.assign(args, {
					start_time: new Date(args.start_time).toGMTString()
				}))
				.end()
				.then(res =>
					// fetch the newly saved response
					context.healthGraphLoader.load(res.header.location)
				)
			);
	},

	type: StrengthTrainingItem

};