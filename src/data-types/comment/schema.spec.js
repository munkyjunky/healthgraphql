const {GraphQLString} = require('graphql');
const commentType = require('./index');

describe('Comments', () => {

    it('should have the correct schema', () => {

        const {comment, name, timestamp, userID} = commentType.getFields();

        expect(comment.type).toEqual(GraphQLString);
        expect(name.type).toEqual(GraphQLString);
        expect(timestamp.type).toEqual(GraphQLString);
        expect(userID.type).toEqual(GraphQLString);
    });

});