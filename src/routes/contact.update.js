'use strict';

const Joi = require('joi');
let server = require('../server');

module.exports = {
    method: 'PUT',
    path:'/contact/{id}',
    handler: (request, reply) => {
        let contactToUpdate = request.payload;
        server.db.contacts.update({
            _id: encodeURIComponent(request.params.id),
            user: request.auth.credentials.id
        }, {
            $set: contactToUpdate
        }, {},
        (err, updatedContact) => {
            reply(updatedContact);
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
