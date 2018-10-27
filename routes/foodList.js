let Food = require('../models/foodList');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://MichealDunne1:FoodDatabase1@ds225543.mlab.com:25543/foodsdb';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

//Unable to connect to the server
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

//Successfully able to connect to server.
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//Find all Pieces of Food
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Food.find(function(err, foodList) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(foodList,null,5));
    });
};

//Find one piece of food
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Food.find({ "_id" : req.params.id },function(err, food) {
        if (err)
            res.json({ message: 'Food NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(food,null,5));
    });
};

//Finding the course dinner
router.findCourse = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Food.find({ "coursedinner" : req.params.coursedinner },function(err, food) {
        if (err)
            res.json({ message: 'Food NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(food,null,5));
    });
};

//Add food to database
router.addFood = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var food = new Food();

    food.coursedinner = req.body.coursedinner;
        food.fooditem = req.body.fooditem;
            food.save(function(err) {
                if (err)
                    res.json({ message: 'Food NOT Added!', errmsg : err } );
                else
                    res.json({ message: 'Food Successfully Added!', data: food });
            });
};

//Add upvote to list
router.incrementUpvotes = (req, res) => {
    Food.findById(req.params.id, function(err,food) {
        if (err)
            res.json({ message: 'Food NOT Found!', errmsg : err } );
        else {
            food.upvotes += 1;
            food.save(function (err) {
                if (err)
                    res.json({ message: 'Food NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Food Successfully Upvoted!', data: food });
            });
        }
    });
};

//Down voting a food system
router.incrementDownvotes = (req, res) => {
    Food.findById(req.params.id, function(err,food) {
        if (err)
            res.json({ message: 'Food NOT Found!', errmsg : err } );
        else {
            food.downvotes -= 1;
            food.save(function (err) {
                if (err)
                    res.json({ message: 'Food NOT DownVoted!', errmsg : err } );
                else
                    res.json({ message: 'Food Successfully DownVoted!', data: food });
            });
        }
    });
};

//Find one piece of food
router.fuzzySearch = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var value = req.params.fooditem.toLowerCase();
    let array = [];
        Food.find(function(err, foodList) {
            if (err)
                res.send(err);
            else {
                for (let i = 0; i < foodList.length; i++) {
                    if (foodList[i].fooditem.toLowerCase().includes(value)) {
                        array.push(foodList[i]);
                    }
                }
                res.send(JSON.stringify(array, null, 5));
            }
        });
};


//Delete a Food Item
router.deleteFood = (req, res) => {
    Food.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Food NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Food Successfully Deleted!'});
    });
};

//Getting total Votes
router.findTotalVotes = (req, res) => {

    Food.find(function(err, donations) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(donations) });
    });
};

//Get all votes
function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

//Get value
function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

module.exports = router;
