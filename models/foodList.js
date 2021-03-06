let mongoose = require('mongoose');

//Schema
let FoodSchema = new mongoose.Schema({
        coursedinner: {type: String, default: ""},
        fooditem: {type: String, default: ""},
        description: {type: String, default: ""},
        image: {type: String, default: ""},
        upvotes: {type: Number, default: 0},
        downvotes: {type: Number, default: 0},
    },
    {collection: 'foodsdb'});


module.exports = mongoose.model('Food', FoodSchema);
