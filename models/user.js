let mongoose = require('mongoose');
let crypto = require('crypto');
const jwt = require('jsonwebtoken');

//Schema
let AuthSchema = new mongoose.Schema({
        authName: {type: String,default: ""},
        authPassword: String,
        hash: String,
        salt: {type: String,default: ""},
    },
    { collection: 'usersdb' });

    AuthSchema.methods.setPassword = function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.authPassword = crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
    };

    AuthSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
    };

    AuthSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        authName: this.authName,
        authPassword: this.authPassword,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

    AuthSchema.methods.toAuthJSON = function() {
        return {
        _id: this._id,
        authName: this.authName,
            authPassword: this.authPassword,
        token: this.generateJWT(),
        };
    };

module.exports = mongoose.model('Authentication', AuthSchema);
