let mongoose = require('mongoose');

let FoodSchema = new mongoose.Schema({
        coursedinner: {type: String,default: ""},
        fooditem: {type: String,default: ""},
        upvotes: {type: Number, default: 0}
    },
    { collection: 'foodsdb' });

module.exports = mongoose.model('Food', FoodSchema);
