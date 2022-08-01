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

function decodeToken(token) {
    const tokenDecoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            // Check if the expiration token has expired
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Expired token'
                });
            }
            resolve(payload.sub);
        }catch (err) {
            reject({
                status: 500,
                message: 'Failed to decode token'
            })
        }
        
    });
    return tokenDecoded;
}

module.exports = {
    createToken,
    decodeToken
}