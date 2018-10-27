let Food = require('../models/foodList');
let food = new Food();

//Testing
exports.testSomething = function(test) {
    if (typeof food.fooditem === 'Soup'){
        test.ok(true, "this passed")
        test.done();
    } else{
        test.ok(false, "this failed")
        test.done();
    }
};

exports.testSomethingElse = function(test) {
    test.ok(true, "this assertion should fail");
    test.done();
};
