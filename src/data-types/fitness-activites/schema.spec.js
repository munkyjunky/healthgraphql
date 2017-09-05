const {GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean} = require('graphql');
const {
    FitnessActivities,
    FitnessItem,
    FitnessCalories,
    FitnessDistance,
    FitnessHeartRate,
    FitnessImage,
    FitnessPath
} = require('./index');
const CommentType = require('../comment');

describe('Fitness Activities', () => {

    describe('Distance', () => {

        it('should have the correct schema', () => {
            const {distance, timestamp} = FitnessDistance.getFields();

            expect(distance.type).toEqual(GraphQLInt);
            expect(timestamp.type).toEqual(GraphQLInt);
        });

    });

    describe('HeartRate', () => {

        it('should have the correct schema', () => {
            const {heart_rate, timestamp} = FitnessHeartRate.getFields();

            expect(heart_rate.type).toEqual(GraphQLInt);
            expect(timestamp.type).toEqual(GraphQLInt);
        });

    });

    describe('Calories', () => {

        it('should have the correct schema', () => {
            const {calories, timestamp} = FitnessCalories.getFields();

            expect(calories.type).toEqual(GraphQLInt);
            expect(timestamp.type).toEqual(GraphQLInt);
        });

    });

    describe('Path', () => {

        it('should have the correct schema', () => {
            const {altitude, latitude, longitude, timestamp, type} = FitnessPath.getFields();

            expect(altitude.type).toEqual(GraphQLInt);
            expect(latitude.type).toEqual(GraphQLInt);
            expect(longitude.type).toEqual(GraphQLInt);
            expect(timestamp.type).toEqual(GraphQLInt);
            expect(type.type).toEqual(GraphQLString);
        });

    });

    describe('Image', () => {

        it('should have the correct schema', () => {
            const {
                latitude, longitude, thumbnail_uri,
                timestamp, uri
            } = FitnessImage.getFields();

            expect(latitude.type).toEqual(GraphQLInt);
            expect(longitude.type).toEqual(GraphQLInt);
            expect(thumbnail_uri.type).toEqual(GraphQLString);
            expect(timestamp.type).toEqual(GraphQLInt);
            expect(uri.type).toEqual(GraphQLString);

        });

    });

    describe('Item', () => {

        it('should have the correct schema', () => {
            const {activity, average_heart_rate, calories, climb, comments, distance, duration, entry_mode, equipment, has_path, heart_rate, images, is_live, notes, path, secondary_type, share, share_map, source, start_time, total_calories, total_distance, tracking_mode, type, userID, utc_offset} = FitnessItem.getFields();

            expect(activity.type).toEqual(GraphQLString);
            expect(average_heart_rate.type).toEqual(GraphQLInt);
            expect(calories.type).toEqual(new GraphQLList(FitnessCalories));
            expect(climb.type).toEqual(GraphQLInt);
            expect(comments.type).toEqual(new GraphQLList(CommentType));
            expect(distance.type).toEqual(new GraphQLList(FitnessDistance));
            expect(duration.type).toEqual(GraphQLInt);
            expect(entry_mode.type).toEqual(GraphQLString);
            expect(equipment.type).toEqual(GraphQLString);
            expect(has_path.type).toEqual(GraphQLBoolean);
            expect(heart_rate.type).toEqual(new GraphQLList(FitnessHeartRate));
            expect(images.type).toEqual(new GraphQLList(FitnessImage));
            expect(is_live.type).toEqual(GraphQLBoolean);
            expect(notes.type).toEqual(GraphQLString);
            expect(path.type).toEqual(new GraphQLList(FitnessPath));
            expect(secondary_type.type).toEqual(GraphQLString);
            expect(share.type).toEqual(GraphQLString);
            expect(share_map.type).toEqual(GraphQLString);
            expect(source.type).toEqual(GraphQLString);
            expect(start_time.type).toEqual(GraphQLString);
            expect(total_calories.type).toEqual(GraphQLInt);
            expect(total_distance.type).toEqual(GraphQLInt);
            expect(tracking_mode.type).toEqual(GraphQLString);
            expect(type.type).toEqual(GraphQLString);
            expect(userID.type).toEqual(GraphQLString);
            expect(utc_offset.type).toEqual(GraphQLInt);
        });

    });

    describe('Activities', () => {

        it('should have the correct schema', () => {
            const {size, items} = FitnessActivities.getFields();

            expect(size.type).toEqual(GraphQLInt);
            expect(items.type).toEqual(new GraphQLList(FitnessItem));
        });

    });

});