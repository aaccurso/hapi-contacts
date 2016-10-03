'use strict';

let server = require('../server');

module.exports = {
    method: 'GET',
    path:'/contact/{id}',
    handler: (request, reply) => {
        server.db.contacts.findOne({
            _id: encodeURIComponent(request.params.id),
            user: request.auth.credentials.id
        }, (err, contact) => {
            reply(contact);
        });
    },
    config: {
        auth: 'simple'
    }
};
