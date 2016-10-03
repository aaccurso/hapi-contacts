'use strict';

const Bcrypt = require('bcrypt');

const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

module.exports = function (request, username, password, callback) {
    const user = users[username];
    if (!user) {
        return callback(null, false);
    }
    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};
