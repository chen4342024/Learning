function testBind() {
    var func = function (greeting, aaa) {
        return greeting + aaa + ': ' + this.name
    };
    func = _.bind(func, {name: 'moe'}, 'hi');
    console.log(func("*bind*"));
}


function myBind(func, obj, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var length = Math.max(arguments.length - 2, 0);
    var rest = Array(length);
    for (var index = 0; index < length; index++) {
        rest[index] = arguments[index + 2];
    }

    return function () {
        var length = arguments.length;
        var args = Array(length);
        for (var index = 0; index < length; index++) {
            args[index] = arguments[index];
        }
        return func.apply(obj, rest.concat(args));
    }
}

function testMyBind() {
    var func = function (greeting, aaa) {
        return greeting + aaa + ': ' + this.name
    };
    func = myBind(func, {name: 'myBind'}, 'himyBind');
    console.log(func("*mybind*"));
}


var keyPress = _.debounce(function () {
    console.log("press key");
}, 1000);

//var input = document.getElementById('input');
//input.onkeypress = keyPress;

var once = function (func) {
    return _.before(2, func);
};

var init = once(function () {
    console.log("xxx")
});

init();
init();
testMyBind();
testBind();

var Animal = function () {
    this.name = "animal";
};

Animal.prototype.run = function () {
    console.log("animal run ...");
};

var dog = _.create(Animal.prototype, {color: "black"});
console.log("dog -->%o",dog);