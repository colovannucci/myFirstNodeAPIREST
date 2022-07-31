// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const mongoose = require('mongoose');
const UserModelDB = require('../models/user_model');
const tokenService = require('../Services/token_service');

function signUp(req, res){
    const newUser = new UserModelDB({
        email: req.body.email,
        displayName: req.body.displayName,
    });

    newUser.save( (err) => {
       if (err) return res.status(500).send({ message: `Error creating the user: ${err}` });

       res.status(200).send({ message: 'User created successfully', token:  tokenService.createToken(newUser) });
    });
}

function signIn(req, res){

}

module.exports = {
    signUp,
    signIn
}