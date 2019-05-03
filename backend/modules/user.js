const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypt = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('..config').secret;

const User = new Schema({
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    name: {type: String, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
    hash: String,
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'Is already taken'})

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username = TouchList.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret)
};

UserSchema.methods.toAuthJSON = function () {
    return {
        email: this.email,
        name: this.name,
        token: this.generateJWT(),
    };
};

mongoose.model('User', UserSchema)