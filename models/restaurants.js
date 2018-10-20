let mongoose = require('mongoose');

let RestaurantSchema = new mongoose.Schema({
        name: String,
        location: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'foodsdb' });

module.exports = mongoose.model('Restaurant', RestaurantSchema);