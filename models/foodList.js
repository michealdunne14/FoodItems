let mongoose = require('mongoose');

let FoodSchema = new mongoose.Schema({
        coursedinner: String,
        fooditem: String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'foodsdb' });

module.exports = mongoose.model('Food', FoodSchema);

/*const foodList = [
    {id: 1000000, coursedinner: 'Starter', fooditem: 'ceasar salad', upvotes: 1},
    {id: 1000001, coursedinner: 'Main', fooditem: 'chicken stir fry', upvotes: 2},
    {id: 1000002, coursedinner: 'Desert', fooditem: 'death by chocolate', upvotes: 100}
];

module.exports = foodList;*/