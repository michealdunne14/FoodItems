let foodList = require('../models/foodList');
let express = require('express');
let router = express.Router();
//Find all Pieces of Food
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(foodList,null,5));
    res.json(foodList);
}
//Find one Piece of food
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var food = getByValue(foodList,req.params.id);

    if (food != null)
        res.send(JSON.stringify(food,null,5));
    else
        res.send('Food NOT Found!!');

}

router.findCourseDinner = (req,res) => {
    res.header('Content-Type', 'application/json');

    var food = getByValue(foodList,req.params.coursedinner)

    if (food != null){
        res.send(JSON.stringify(food,null,5));
    } else
        res.send("Food Not Found!!");
}

//Add food to database
router.addFood = (req, res) => {
    //Add a new donation to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = foodList.length;

    foodList.push({id: id, "coursedinner": req.body.coursedinner, "fooditem": req.body.fooditem, upvotes: 0});

    if((currentSize + 1) == foodList.length)
        res.json({ message: 'Food Added Successfully!'});
    else
        res.json({ message: 'Food NOT Added!'});
}
//Add upvote to list
router.incrementUpvotes = (req, res) => {
    /*res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(foodList,null,5));*/

    var food = getByValue(foodList,req.params.id);

    if (food != null) {
        food.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , donation : food });
    }
    else
        res.send('Food NOT Found - UpVote NOT Successful!!');

}
//Delete a
router.deleteFood = (req, res) => {
    //Delete the selected donation based on its id
    var food = getByValue(foodList,req.params.id);
    var index = foodList.indexOf(food);

    var currentSize = foodList.length;
    foodList.splice(index, 1);

    if((currentSize - 1) == foodList.length)
        res.json({ message: 'Food Deleted!'});
    else
        res.json({ message: 'Food NOT Deleted!'});
}

router.findTotalVotes = (req, res) => {

    let votes = getTotalVotes(foodList);
    res.json({totalvotes : votes});
}
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