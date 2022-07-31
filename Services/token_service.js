// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const jwtSimple = require('jwt-simple');
const moment = require('moment');
const config = require('../configuration');

function createToken(newUser){
    const payload = {
        sub: newUser._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwtSimple.encode(payload, config.SECRET_TOKEN);
}

module.exports = createToken;