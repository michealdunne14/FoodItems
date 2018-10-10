let mongoose = require('mongoose');

let FoodSchema = new mongoose.Schema({
        coursedinner: String,
        fooditem: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'foodsdb' });

module.exports = mongoose.model('Food', FoodSchema);
