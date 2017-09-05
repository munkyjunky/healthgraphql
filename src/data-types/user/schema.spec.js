const {GraphQLString} = require('graphql');
const userType = require('./index');
const profileType = require('../profile');
const {FitnessActivities} = require('../fitness-activites');
const {StrengthTrainingActivities} = require('../strength-training');

describe('Comments', () => {

    it('should have the correct schema', () => {

        const {fitness_activities, profile, strength_training_activities, userID} = userType.getFields();

        expect(fitness_activities.type).toEqual(FitnessActivities);
        expect(profile.type).toEqual(profileType);
        expect(strength_training_activities.type).toEqual(StrengthTrainingActivities);
        expect(userID.type).toEqual(GraphQLString);
    });

});