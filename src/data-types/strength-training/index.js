const {GraphQLString, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull, GraphQLID} = require('graphql');
const resolveItems = require('../../helpers/resolve-items');
const i18n = require('../../helpers/i18n');
const CommentType = require('../comment');
const nodeInterface = require('../node-interface').nodeInterface;
const toGlobalId = require('graphql-relay').toGlobalId;
const globalIdTypes = require('../../constants/global-id-types');
const {FitnessItem} = require('../fitness-activites');


const StrengthTrainingSet = new GraphQLObjectType({
    name: 'StrengthTrainingSet',
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
});

const StrengthTrainingExercise = new GraphQLObjectType({
    name: 'StrengthTrainingExercise',
    fields: {
        notes: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.NOTES'),
            type: GraphQLString
        },
        primary_muscle_group: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_MUSCLE_GROUP'),
            type: GraphQLString
        },
        primary_type: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.PRIMARY_TYPE'),
            type: GraphQLString
        },
        routine: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.ROUTINE'),
            type: GraphQLString
        },
        secondary_muscle_group: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SECONDARY_MUSCLE_GROUP'),
            type: GraphQLString
        },
        secondary_type: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SECONDARY_TYPE'),
            type: GraphQLString
        },
        sets: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.EXERCISE.SETS'),
            type: new GraphQLList(StrengthTrainingSet)
        }
    }
});

const StrengthTrainingItem = new GraphQLObjectType({
    name: 'StrengthTrainingItem',
    fields: {
        comments: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.COMMENTS'),
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri)
                    .then(d => context.healthGraphLoader.load(d.comments))
                    .then(c => c.comments);
            },
            type: new GraphQLList(CommentType)
        },
        exercises: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.EXERCISES'),
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => d.exercises);
            },
            type: new GraphQLList(StrengthTrainingExercise)
        },
        id: {
            resolve(parent) {
                return toGlobalId(globalIdTypes.strength_training_activities, parent.uri);
            },
            type: new GraphQLNonNull(GraphQLID)
        },
        nearest_fitness_activity: {
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => context.healthGraphLoader.load(d.nearest_fitness_activity));
            },
            get type() {
                return require('../fitness-activites').FitnessItem;
            }
        },
        nearest_teammate_fitness_activities: {
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => context.healthGraphLoader.loadMany(d.nearest_teammate_fitness_activities));
            },
            get type() {
                return new GraphQLList(require('../fitness-activites').FitnessItem);
            }
        },
        nearest_teammate_strength_training_activities: {
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => context.healthGraphLoader.loadMany(d.nearest_teammate_strength_training_activities))
            },
            get type() {
                return new GraphQLList(StrengthTrainingItem);
            }
        },
        notes: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.NOTES'),
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => d.notes);
            },
            type: GraphQLString
        },
        source: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.SOURCE'),
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => d.source);
            },
            type: GraphQLString
        },
        start_time: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.START_TIME'),
            type: GraphQLString
        },
        total_calories: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.TOTAL_CALORIES'),
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => d.total_calories);
            },
            type: GraphQLFloat
        },
        userID: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ITEM.USERID'),
            resolve(parent, args, context) {
                return context.healthGraphLoader.load(parent.uri).then(d => d.userID);
            },
            type: GraphQLInt
        }
    },
    interfaces: [nodeInterface]
});

const StrengthTrainingActivities = new GraphQLObjectType({
    name: 'StrengthTrainingActivities',
    fields: {
        size: {
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ACTIVITIES.SIZE'),
            type: GraphQLInt
        },
        items: {
            args: resolveItems.args,
            description: i18n.t('GRAPHQL.STRENGTH_TRAINING.ACTIVITIES.ITEMS'),
            resolve: resolveItems.resolve,
            type: new GraphQLList(StrengthTrainingItem)
        }
    }
});

module.exports = {
    StrengthTrainingActivities,
    StrengthTrainingExercise,
    StrengthTrainingSet,
    StrengthTrainingItem
};