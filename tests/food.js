let Food = require('../models/foodList');
exports.test1 = function (test) {
    var food = new Food();
}

exports.testSomething = function(test) {
    if (typeof test === 'Soup'){
        return test.ok(true, "this passed")
        test.done()
    } else{
        return test.ok(false, "this failed")
    }
};

exports.testSomethingElse = function(test) {
    test.ok(true, "this assertion should fail");
    test.done();
};
