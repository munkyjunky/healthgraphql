const healthgraphql = require('../../src/healthgraphql');


module.exports = function (query, method = 'GET') {

    return new Promise((resolve, reject) => {

        const req = {
            headers: {},
            method,
            params: {},
            send: () => {},
            url: `?query=${query}`
        };

        const res = {
            end: (data) => {
                const struct = JSON.parse(data);

                (struct.errors || []).forEach(err => {
                   console.error(err.message);
                });

                struct.errors ? reject() : resolve(struct);
            },
            setHeader: () => {},
            setRequestHeader: () => {}
        };

        healthgraphql()(req, res);

    });

};