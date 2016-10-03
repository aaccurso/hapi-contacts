"use strict";

module.exports = [{
    method: 'GET',
    path:'/me', 
    handler: (request, reply) => {
        return reply(request.auth.credentials);
    },
    config: {
        auth: 'simple'
    }
}];
