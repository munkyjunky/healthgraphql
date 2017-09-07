const {GraphQLString, GraphQLList} = require('graphql');
const userType = require('./index');
const profileType = require('../profile');
const {FitnessActivities} = require('../fitness-activites');
const {StrengthTrainingActivities} = require('../strength-training');
const {Records} = require('../records');

describe('Comments', () => {

    it('should have the correct schema', () => {

        const {fitness_activities, profile, records, strength_training_activities, userID} = userType.getFields();

        expect(fitness_activities.type).toEqual(FitnessActivities);
        expect(profile.type).toEqual(profileType);
        expect(records.type).toEqual(new GraphQLList(Records));
        expect(strength_training_activities.type).toEqual(StrengthTrainingActivities);
        expect(userID.type).toEqual(GraphQLString);
    });

});