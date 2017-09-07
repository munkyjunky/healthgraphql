const {GraphQLString, GraphQLFloat, GraphQLList} = require('graphql');
const {Records, Stats} = require('./index');

describe('Personal Records', () => {

    describe('Records', () => {

        it('should have the correct schema', () => {
            const {activity_type, stats} = Records.getFields();

            expect(activity_type.type).toEqual(GraphQLString);
            expect(stats.type).toEqual(new GraphQLList(Stats));

        });

    });

    describe('Stats', () => {

        it('should have the correct schema', () => {
            const {date, stat_type, value} = Stats.getFields();

            expect(date.type).toEqual(GraphQLString);
            expect(stat_type.type).toEqual(GraphQLString);
            expect(value.type).toEqual(GraphQLFloat);
        });

    });

});