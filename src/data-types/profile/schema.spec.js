const {GraphQLString, GraphQLBoolean} = require('graphql');
const profileType = require('./index');

describe('Profile', () => {

    it('should have the correct schema', () => {

        const {
            athlete_type, birthday, elite, gender, large_picture, location, medium_picture, name, normal_picture, profile, small_picture
        } = profileType.getFields();

        expect(athlete_type.type).toEqual(GraphQLString);
        expect(birthday.type).toEqual(GraphQLString);
        expect(elite.type).toEqual(GraphQLBoolean);
        expect(gender.type).toEqual(GraphQLString);
        expect(large_picture.type).toEqual(GraphQLString);
        expect(location.type).toEqual(GraphQLString);
        expect(medium_picture.type).toEqual(GraphQLString);
        expect(name.type).toEqual(GraphQLString);
        expect(normal_picture.type).toEqual(GraphQLString);
        expect(profile.type).toEqual(GraphQLString);
        expect(small_picture.type).toEqual(GraphQLString);
    });

});