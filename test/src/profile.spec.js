const nock = require('nock');
const constants = require('../../src/constants/healthgraph');
const healthgraphql = require('../helpers/healthgraphql');
const root = require('../res/root');
const profileResponse = require('../res/profile');


describe('Profile', () => {

    beforeEach(() => {
        // mock API HTTP response
        nock(constants.BASE_URL)
            .get(constants.ROOT)
            .reply(200, root);

        nock(constants.BASE_URL)
            .get(root.profile)
            .reply(200, profileResponse);
    });

    it('should return the correct userID', () => {

        const query = `{ userID }`;

        return healthgraphql(query).then(res => {
            expect(res).toMatchSnapshot();
        });

    });

    it('should return correct profile information', () => {

        const query = `{
            profile {
                name,
                location,
                birthday
            } 
        }`;

        return healthgraphql(query).then(res => {
            expect(res).toMatchSnapshot();
        });

    });

});
