// Use restrictive JS mode to avoid silence errors of the project
'use strict';

const mongoose = require('mongoose');
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
UserSchema.pre("save", async function(done){
  if (this.isModified("pasword")){
    // Generate a salt, an array of random bytes
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      // Hash the password with the salt
      bcrypt.hash(this.get("password"), salt, null, (err, hash) => {
          if (err) return next(err);

          this.set("password", hash);
      });
    });
    done();
  }
});

/*
UserSchema.pre('save', (next) => {
    const user = this;
    // Check if the password is not modified
    if(!user.isModified('password')) return next();
    // Generate a salt, an array of random bytes
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        // Hash the password with the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    });
});
*/
/*
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
  
      bcrypt.hash(this.password, salt, null, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
      })
    })
  })
*/

module.exports = mongoose.model('User', UserSchema);