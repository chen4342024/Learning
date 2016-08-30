function testURI() {
    var uri = "http://www.wrox.com/illegal value.htm?a=http://www.baidu.com";
    var encodeURIResult = encodeURI(uri);

    var encodeURIComponentResult = encodeURIComponent(uri);
//"http://www.wrox.com/illegal%20value.htm#start"
    console.log("encodeURIResult--->" + encodeURIResult);
    console.log("encodeURIComponentResult--->" + encodeURIComponentResult);
    console.log("decodeURIResult--->" + decodeURI(encodeURIResult));
    console.log("decodeURIComponentResult--->" + decodeURIComponent(encodeURIComponentResult));
}


function testEval() {
    var command = "console.log('eval command')";
    eval(command);
    eval("function sayHi(){console.log('hi')}");
    sayHi();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


testURI();
testEval();

console.log(random(0, 2));