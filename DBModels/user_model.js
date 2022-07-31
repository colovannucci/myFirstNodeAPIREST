// Use restrictive JS mode to avoid silence errors of the project
'use strict';

const mongoose = require('moongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // lowercase: true to make email lowercase
    displayName: String,
    password: { type: String, select: false }, // select: false to avoid showing the password in the JSON response
    signupDate: { type: Date, default: Date.now },
    lastLogin: Date
});

// Excecute before each user.save call in database
UserSchema.pre('save', (next) => {
    const user = this;
    // Check if the password is not modified
    if(!user.isModified('password')) return next();
    // Generate a salt, an array of random bytes
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        // Hash the password with the salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    });
});

module.exports = mongoose.Schema('User', UserSchema);