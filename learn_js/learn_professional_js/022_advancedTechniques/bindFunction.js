var handler = {
    message: "handler message",
    handlerClick: function (event) {
        console.log(this.message);
    }
};

var bind = function (fn, context) {
    return function () {
        fn.apply(context, arguments);
    }
};

var nomalBtn = document.getElementById("nomalBtn");
var bindBtn = document.getElementById("bindBtn");
nomalBtn.addEventListener("click", handler.handlerClick, false);
bindBtn.addEventListener("click", bind(handler.handlerClick, handler), false);
//bindBtn.addEventListener("click", handler.handlerClick.bind(handler), false);

function curry(fn, context) {
    var args = [].slice.call(arguments, 2);
    return function () {
        var totalArgs = args.concat([].slice.call(arguments));
        return fn.apply(context, totalArgs);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function curriedAdd(num2) {
    return add(5, num2)
}

var curryAdd5 = curry(add, null, 5);
console.log(curryAdd5(1));
console.log(curriedAdd(1));

/*-------------------*/
function Person(name){
    if(this instanceof Person){
        this.name = name;
    }else{
        return new Person(name)
    }
}
