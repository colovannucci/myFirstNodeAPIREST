// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const UserModelDB = require('../DBModels/user_model');
const tokenService = require('../Services/token_service');

function signUp(req, res){
    const newUser = new UserModelDB({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });

    newUser.save( (err) => {
       if (err) return res.status(500).send({ message: `Error creating the user: ${err}` });

       return res.status(201).send({ message: 'User created successfully', token:  tokenService.createToken(newUser) });
    });
}

function signIn(req, res){
    UserModelDB.find( {email: req.body.email}, (err, userFound) => {
        if (err) return res.status(500).send({ message: `Error finding user: ${err}` });
        if (!userFound) return res.status(404).send({ message: "User doesn't exist" });

        req.user = userFound;
        res.status(200).send({ 
            message: "User logged successfully",
            token: tokenService.createToken(userFound)
        });
    });
}

module.exports = {
    signUp,
    signIn
}