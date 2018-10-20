let User = require('../models/authentication');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://MichealDunne1:FoodDatabase1@ds225543.mlab.com:25543/foodsdb';

mongoose.connect(mongodbUri);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//Find one piece of food
router.findUser = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    User.find({ "authName" : req.params.authName },function(err, user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(user,null,5));
    });
}

router.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.authName, function(err) {
        if (err)
            res.json({ message: 'User NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Deleted!'});
    });
}

router.addUser = (req,res) => {
    res.setHeader('Content-Type','application/json');

    var user = new User();

    user.authName = req.body.authName;
    user.authPassword = req.body.authPassword;

    user.save(function (err) {
        if (err) {
            res.json({message: 'User NOT Added!', errmsg: err});
        } else {
            res.json({message: 'User Successfully Added!', data: user});
        }
    });
}


module.exports = router;
