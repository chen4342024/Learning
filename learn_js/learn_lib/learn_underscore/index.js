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
console.log("dog -->%o", dog);

for(var key in dog){console.log(key)}

function test() {
    var a = {};
    for (var i = 0; i < 100000; i++) {
        a[i] = ("adf" + i);
    }
    a.length = 100000;

    console.time("toArray");
    _.toArray(a);
    console.timeEnd("toArray");
    console.time("slice");
    Array.prototype.slice.call(a);
    console.timeEnd("slice");
}

var array = _.range(10000000);
function testArrayCopy() {
    console.time("for copy");
    var copyArray0 = Array(array.length);
    for (var i = 0, len = array.length; i < len; i++) {
        copyArray0[i] = array[i];
    }
    console.timeEnd("for copy");

    console.time("for copy push");
    var copyArray1 = [];
    for (var i = 0, length = array.length; i < length; i++) {
        copyArray1.push(array[i]);
    }
    console.timeEnd("for copy push");


    console.time("slice");
    var copyArray2 = Array.prototype.slice.call(array);
    console.timeEnd("slice");

    console.time("concat");
    var copyArray3 = Array.prototype.concat.call(array);
    console.timeEnd("concat");

}

function copyArray(array, dir) {
    var copyArray = [];
    var i = dir > 0 ? 0 : array.length - 1;

    for (; i >= 0 && i < array.length; i += dir) {
        copyArray.push(array[i]);
    }
    return copyArray;
}

