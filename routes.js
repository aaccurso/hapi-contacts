"use strict";

module.exports = [{
    method: 'GET',
    path:'/hello', 
    handler: (request, reply) => {
        return reply('hello world');
    }
}];
