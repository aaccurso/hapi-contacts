'use strict';

const Bcrypt = require('bcrypt');
const usersSeed = require('./users.seed');
let server = require('../../server');

server.db.users.insert(usersSeed, (err, newUsers) => {
    if (err) {
        console.error(err);
    }
    console.log('Users seed:', newUsers);
});

module.exports = function (request, username, password, callback) {
    server.db.users.findOne({ username: username }, (err, user) => {
        if (!user) {
            return callback(null, false);
        }
        Bcrypt.compare(password, user.password, (err, isValid) => {
            callback(err, isValid, { id: user._id, name: user.name });
        });
    });
};
