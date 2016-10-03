'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
let server = new Hapi.Server();
server.connection({ 
    host: 'localhost',
    port: 8000 ,
    routes: {
        cors: true
    }
});

// Create datastores for users and contacts
const Datastore = require('nedb');
server.db = {
    users: new Datastore(),
    contacts: new Datastore()
};

module.exports = server;

// Add basic authentication
const HapiAuthBasic = require('hapi-auth-basic');
server.register(HapiAuthBasic, (err) => {
    const validate = require('./auth/validate');
    server.auth.strategy('simple', 'basic', { validateFunc: validate });

    // Add routes
    const routes = require('./routes/index');
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
