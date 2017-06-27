var getName = function () {
    return "svenzeng"
}
var getSex = function () {
    return 'man'
}

var getUserInfo = function () {
    var info = a() + b();
    return info;
}


// eg:
var stopEvent = function (e) { //同时阻止事件默认行为和冒泡
    e.stopPropagation();
    e.preventDefault();
}