'use strict';

let server = require('../server');

module.exports = {
    method: 'DELETE',
    path:'/contact/{id}',
    handler: (request, reply) => {
        server.db.contacts.remove({
            _id: encodeURIComponent(request.params.id),
            user: request.auth.credentials.id
        }, {}, function (err, numRemoved) {
            reply(numRemoved);
        });
    },
    config: {
        auth: 'simple'
    }
};
