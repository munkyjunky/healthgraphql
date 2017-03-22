const HEALTHGRAPH = require('../constants/healthgraph');
const graphql = require('graphql');
const GraphQLString = graphql.GraphQLString;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLInputObjectType = graphql.GraphQLInputObjectType;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLBoolean = graphql.GraphQLBoolean;
const GraphQLList = graphql.GraphQLList;
const GraphQLFloat = graphql.GraphQLFloat;
const GraphQLEnumType = graphql.GraphQLEnumType;
const i18n = require('../helpers/i18n');
const request = require('superagent-promise')(require('superagent'), Promise);


const MuscleTypes = new GraphQLEnumType({
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

const ExerciseTypes = new GraphQLEnumType({
	name: 'ExerciseTypes',
	values: {
		BARBELL_CURL: {value: 'Barbell Curl'},
		DUMBBELL_CURL: {value: 'Dumbbell Curl'},
		BARBELL_TRICEP_PRESS: {value: 'Barbell Tricep Press'},
		DUMBBELL_TRICEP_PRESS: {value: 'Dumbbell Tricep Press'},
		OVERHEAD_PRESS: {value: 'Overhead Press'},
		WRIST_CURL: {value: 'Wrist Curl'},
		TRICEP_KICKBACK: {value: 'Tricep Kickback'},
		BENCH_PRESS: {value: 'Bench Press'},
		CABLE_CROSSOVER: {value: 'Cable Crossover'},
		DUBBELL_FLY: {value: 'Dumbbell Fly'},
		INCLINE_BENCH: {value: 'Incline Bench'},
		DIPS: {value: 'Dips'},
		PUSHUP: {value: 'Pushup'},
		PULLUP: {value: 'Pullup'},
		BACK_RAISE: {value: 'Back Raise'},
		BENT_OVER_ROW: {value: 'Bent-Over Row'},
		SEATED_ROW: {value: 'Seated Row'},
		CHINUP: {value: 'Chinup'},
		LAT_PULLDOWN: {value: 'Lat Pulldown'},
		SEATED_REVERSE_FLY: {value: 'Seated Reverse Fly'},
		MILITARY_PRESS: {value: 'Military Press'},
		UPRIGHT_ROW: {value: 'Upright Row'},
		FRONT_RAISE: {value: 'Front Raise'},
		SIDE_LATERAL_RAISE: {value: 'Side Lateral Raise'},
		SNATCH: {value: 'Snatch'},
		PUSH_PRESS: {value: 'Push Press'},
		SHRUG: {value: 'Shrug'},
		CRUNCH_MACHINE: {value: 'Crunch Machine'},
		CRUNCH: {value: 'Crunch'},
		AB_TWIST: {value: 'Ab Twist'},
		BICYCLE_KICK: {value: 'Bicycle Kick'},
		HANGING_LEG_RAISE: {value: 'Hanging Leg Raise'},
		HANGING_KNEE_RAISE: {value: 'Hanging Knee Raise'},
		REVERSE_CRUNCH: {value: 'Reverse Crunch'},
		V_UP: {value: 'V Up'},
		SITUP: {value: 'Situp'},
		SQUAT: {value: 'Squat'},
		LUNGE: {value: 'Lunge'},
		DEAD_LIFT: {value: 'Dead Lift'},
		HAMSTRING_CURL: {value: 'Hamstring Curl'},
		GOOD_MORNING: {value: 'Good Morning'},
		CLEAN: {value: 'Clean'},
		LEG_PRESS: {value: 'Leg Press'},
		LEG_EXTENSION: {value: 'Leg Extension'},
		OTHER: {value: 'Other'}
	}
});


/*
 *  TODO:
 *  Add response type (reuse query data-type?)
 */
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
				.type(HEALTHGRAPH.CONTENT_TYPES.strength_training_activities)
				.query({ access_token: context.access_token })
				.send(Object.assign(args, {
					start_time: new Date(args.start_time).toGMTString()
				}))
				.end()
			);
	},

	// response query
	type: new GraphQLObjectType({
		name: 'StrengthTrainingActivityMutation',
		fields: {
			start_time: {
				type: GraphQLString
			}
		}
	})

};