// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const jwtSimple = require('jwt-simple');
const moment = require('moment');
const config = require('../configuration');

function isAuthenticated( req, res, next){
    // Check if the request has a header called authorization
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'You must be logged in to view this page' });
    }
    // Get the token from the headers, separating the Bearer from the token
    const userToken = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(userToken, config.SECRET_TOKEN);

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }

    // Set the user to the request object
    req.user = payload.sub;
    next();
}

module.exports = isAuthenticated;