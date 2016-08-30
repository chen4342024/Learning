function strLife() {
    var s1 = "123";
    s1.color = "red";
    console.log("s1.color -->" + s1.color);
}

function booleanTest() {
    var falseObj = new Boolean(false);
    console.log("false obj --> " + falseObj);
    console.log("falseObj == false --->" + (falseObj == false));
    console.log("falseObj && true --->" + (falseObj && true));
}

function stringTest() {
    var str = "hello world";
    console.log("str---> char at 1--> " + str.charAt(1));
    console.log("str---> char code at 1--> " + str.charCodeAt(1));
    console.log("str concat 123  --> " + str.concat("123"));
    console.log("str slice(1,2)  --> " + str.slice(1, 3));
    console.log("str substr(1,2)  --> " + str.substr(1, 3));
    console.log("str substrng(1,2)  --> " + str.substring(1, 3));
    console.log("str slice(-4,-3)  --> " + str.slice(-4, -3));
    console.log("str substr(-1)  --> " + str.substr(-1));
    console.log("str substrng(-1)  --> " + str.substring(-1));
    console.log("str indexOf(o,3)  --> " + str.indexOf("o", 3));
    console.log("str lastIndexOf(o,3)  --> " + str.lastIndexOf("o"));
    console.log("str match(ell)---->%o", str.match("ell"));
    console.log("str search(ell)---->%s", str.search("ell"));
}

function replaceTest() {
    var str = "hello world";
    console.log("str replace o to q --> " + str.replace("o", "q"));
    console.log("str replace o to q --> " + str.replace(/o/g, "q"));
    console.log("str replace /(wo)(r)/g, q$1q$2q --> " + str.replace(/(wo)(r)/g, "q$1q$2q"));
    console.log("str replace /(wo)(r)/g, q$1q --> " + str.replace(/(wo)/g, "q$1qq"));
    var afterReplace = str.replace(/o/g, function (match, pos, originalText) {
        console.log("match-->%o,pos-->%o,originalText-->%o", match, pos, originalText);
        return "q";
    });
    console.log("str afterReplace --> " + afterReplace);
}


strLife();
booleanTest();
stringTest();
replaceTest();