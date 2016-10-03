'use strict';

const Boom = require('boom');
let server = require('../server');
const contactsSeed = require('./contacts.seed');

server.db.contacts.insert(contactsSeed, (err, newContacts) => {
    if (err) {
        console.error(err);
    }
    console.log('Contacts seed:', newContacts);
});

module.exports = {
    method: 'GET',
    path:'/contact',
    handler: (request, reply) => {
        server.db.contacts.find({
            user: request.auth.credentials.id
        }, (err, contacts) => {
            if (err) {
                return Boom.badImplementation('Internal server error', err);
            }
            reply(contacts);
        });
    },
    config: {
        auth: 'simple'
    }
};
