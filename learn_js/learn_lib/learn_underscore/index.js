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

function test1() {
    console.time("push");
    var a = new Array();
    for (var i = 0; i < 10000000; i++) {
        a.push(i);
    }
    console.timeEnd("push");

    console.time("length");
    var bd1 = new Date().getTime();
    var b = new Array();
    var bi = 0;
    for (var i = 0; i < 10000000; i++) {
        b[b.length] = i;
    }
    ;
    console.timeEnd("length");

}

function test2() {
    console.time("length");
    var b = new Array(10000000);
    var len = 0;
    for (var i = 0; i < 10000000; i++) {
        b[len++] = i;
    }
    console.timeEnd("length");

    console.time("push");
    var a = new Array();
    for (var i = 0; i < 10000000; i++) {
        a.push(i);
    }
    console.timeEnd("push");
}