'use strict';

const Joi = require('joi');
let server = require('../server');

module.exports = {
    method: 'POST',
    path:'/contact',
    handler: (request, reply) => {
        let newContact = request.payload;
        newContact.user = request.auth.credentials.id;
        server.db.contacts.insert(newContact, (err, insertedContact) => {
            if (err) {
                return Boom.badImplementation('Internal server error', err);
            }
            reply(insertedContact);
        });
    },
    config: {
        auth: 'simple',
        validate: { 
            payload: { 
                name: Joi.string().min(1).required(), 
                email: Joi.string().email().required(),
                phoneNumber: Joi.string().min(1).required(),
                cellPhoneNumber: Joi.string().min(1).optional()
            }
        }
    }
};
