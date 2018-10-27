let mongoose = require('mongoose');
let crypto = require('crypto');

//Schema
let AuthSchema = new mongoose.Schema({
        authName: {type: String,default: ""},
        authPassword: String,
    },
    { collection: 'usersdb' });

    AuthSchema.methods.setPassword = function(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.authPassword = crypto.pbkdf2Sync(password,this.salt,10000,16,'sha512').toString('hex');
    }

module.exports = mongoose.model('Authentication', AuthSchema);
