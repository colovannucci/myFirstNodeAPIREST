// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const tokenService = require('../Services/token_service');

function isAuthenticated( req, res, next){
    // Check if the request has a header called authorization
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'You must be logged in to view this page' });
    }
    // Get the token from the headers, separating the Bearer from the token
    const userToken = req.headers.authorization.split(' ')[1];
    
    tokenService.decodeToken(userToken)
        .then(response => {
            // Set the user to the request object
            req.user = response;
            next();
        })
        .catch(error => {
            res.status(error.status).send(error.message);
        })
    
}

module.exports = isAuthenticated;