'use strict';

const Hapi = require('hapi');
const HapiAuthBasic = require('hapi-auth-basic');

let routes = require('./src/routes/index');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.register(HapiAuthBasic, (err) => {
    // Add basic authentication
    const validate = require('./src/auth/validate');
    server.auth.strategy('simple', 'basic', { validateFunc: validate });

    for (let route of routes) {
        server.route(route);
    }

    // Start the server
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

module.exports = server;
