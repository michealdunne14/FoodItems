let User = require('../models/user');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connecting to database
var mongodbUri ='mongodb://MichealDunne1:FoodDatabase1@ds225543.mlab.com:25543/foodsdb';
mongoose.connect(mongodbUri);
let db = mongoose.connection;

//Unable to connect to server
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

//Successfully connected to server
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


//Finding all Users
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    User.find(function(err, user) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(user,null,5));
    });
};

router.login = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    User.find({"authName": req.params.authName}, function (err,user) {
            for (let i = 0; i <= user.length;i++) {
                if (user[i].authName === req.params.authName) {
                    if (user[i].validatePassword(req.params.authPassword)) {
                        res.send(JSON.stringify(user.authName))

                    }
                }
            }
        })
        res.send(JSON.stringify(user))
}


//Find one piece of food
router.findUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.find({ "authName" : req.params.authName },function(err, user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(user,null,5));
    });
};

//Deleting a user
router.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'User NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Deleted!'});
    });
};

//Adding a user
router.addUser = (req,res) => {
    res.setHeader('Content-Type','application/json');

    var user = new User();

    user.authName = req.body.authName;
    user.authPassword = req.body.authPassword;
    //Encrypting the password
    user.setPassword(user.authPassword);
    user.save(function (err) {
        if (err) {
            res.json({message: 'User NOT Added!', errmsg: err});
        } else {
            res.json({message: 'User Successfully Added!', data: user});
        }
    });
};


module.exports = router;
