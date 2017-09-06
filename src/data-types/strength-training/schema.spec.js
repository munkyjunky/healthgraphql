const {GraphQLString, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull, GraphQLID} = require('graphql');
const {StrengthTrainingActivities, StrengthTrainingExercise, StrengthTrainingSet, StrengthTrainingItem} = require('./index');
const CommentType = require('../comment');

describe('Strength Training', () => {

    describe('StrengthTrainingSet', () => {

        it('should have the correct schema', () => {
            const {notes, repetitions, weight} = StrengthTrainingSet.getFields();

            expect(notes.type).toEqual(GraphQLString);
            expect(repetitions.type).toEqual(GraphQLInt);
            expect(weight.type).toEqual(GraphQLFloat);
        });

    });

    describe('StrengthTrainingExercise', () => {

        it('should have the correct schema', () => {
            const {notes, primary_muscle_group, primary_type, routine, secondary_muscle_group, secondary_type, sets} = StrengthTrainingExercise.getFields();

            expect(notes.type).toEqual(GraphQLString);
            expect(primary_muscle_group.type).toEqual(GraphQLString);
            expect(primary_type.type).toEqual(GraphQLString);
            expect(routine.type).toEqual(GraphQLString);
            expect(secondary_muscle_group.type).toEqual(GraphQLString);
            expect(secondary_type.type).toEqual(GraphQLString);
            expect(sets.type).toEqual(new GraphQLList(StrengthTrainingSet));
        });

    });

    describe('StrengthTrainingItem', () => {

        it('should have the correct schema', () => {
            const {comments, exercises, id, notes, source, start_time, total_calories, userID} = StrengthTrainingItem.getFields();

            expect(comments.type).toEqual(new GraphQLList(CommentType));
            expect(exercises.type).toEqual(new GraphQLList(StrengthTrainingExercise));
            expect(id.type).toEqual(new GraphQLNonNull(GraphQLID));
            expect(notes.type).toEqual(GraphQLString);
            expect(source.type).toEqual(GraphQLString);
            expect(start_time.type).toEqual(GraphQLString);
            expect(total_calories.type).toEqual(GraphQLFloat);
            expect(userID.type).toEqual(GraphQLInt);

        });

    });

    describe('StrengthTrainingActivities', () => {

        it('should have the correct schema', () => {
            const {size, items} = StrengthTrainingActivities.getFields();

            expect(size.type).toEqual(GraphQLInt);
            expect(items.type).toEqual(new GraphQLList(StrengthTrainingItem));
        });

    });
});