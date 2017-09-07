const {GraphQLString, GraphQLObjectType, GraphQLFloat, GraphQLList} = require('graphql');
const i18n = require('../../helpers/i18n');

const Stats = new GraphQLObjectType({
    name: 'Stats',
    fields: {
        date: {
            description: i18n.t('GRAPHQL.RECORDS.DATE'),
            type: GraphQLString
        },
        stat_type: {
            description: i18n.t('GRAPHQL.RECORDS.STAT_TYPE'),
            type: GraphQLString
        },
        value: {
            description: i18n.t('GRAPHQL.RECORDS.VALUE'),
            type: GraphQLFloat
        }
    }
});

const Records = new GraphQLObjectType({
    name: 'PersonalRecords',
    fields: {
        activity_type: {
            description: i18n.t('GRAPHQL.RECORDS.ACTIVITY_TYPE'),
            type: GraphQLString
        },
        stats: {
            description: i18n.t('GRAPHQL.RECORDS.STATS'),
            type: new GraphQLList(Stats)
        }
    }
});

module.exports = {
    Records,
    Stats
};