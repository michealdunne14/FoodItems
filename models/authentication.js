let mongoose = require('mongoose');

let AuthSchema = new mongoose.Schema({
        authName: {type: String,default: ""},
        authPassword: String,
    },
    { collection: 'foodsdb' });

module.exports = mongoose.model('Authentication', AuthSchema);
