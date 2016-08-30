function testRegExp() {
    var re = null, i;
    for (i = 0; i < 10; i++) {
        re = /cat/g;
        console.log(re.test("catastrophoe"));
    }

    for (i = 0; i < 10; i++) {
        re = new RegExp("cat", "g");
        console.log(re.test("catastrophoe"));
    }
}

function regExpAttribute() {
    var pattern1 = /abc/gi;
    console.log("pattern1 global ----> " + pattern1.global);
    console.log("pattern1 ignoreCase ----> " + pattern1.ignoreCase);
    console.log("pattern1 multiline ----> " + pattern1.multiline);
    console.log("pattern1 lastIndex ----> " + pattern1.lastIndex);
    console.log("pattern1 source ----> " + pattern1.source);
}

function execTest() {
    var text = "aaaabc abc defg";
    var pattern = /abc/gi;
    var matches = pattern.exec(text);
    console.log("matches.index --> " + matches.index);
    console.log("matches.input --> " + matches.input);
    console.log("matches.length --> " + matches.length);
    matches.forEach(function (index, match) {
        console.log("matches[%s] --> %s", match, index);
    });
    var matches2 = pattern.exec(text);
    console.log("matches.index --> " + matches2.index);
    console.log("matches.input --> " + matches2.input);
    console.log("matches.length --> " + matches2.length);
    matches2.forEach(function (index, match) {
        console.log("matches[%s] --> %s", match, index);
    });
}

function testDemo() {
    var text = "000-00-0000";
    var pattern = /\d{3}-\d{2}-\d{4}/;
    console.log("%s.test(%s) --> %s", pattern, text, pattern.test(text));
}

function regExpStaticDemo() {
    var text = "this ha been a short summer";
    var pattern = /(.)hort/g;
    if (pattern.test(text)) {
        console.log("RegExp.input ---> " + RegExp.input);
        console.log("RegExp.leftContext ---> " + RegExp.leftContext);
        console.log("RegExp.rightContext ---> " + RegExp.rightContext);
        console.log("RegExp.lastMatch ---> " + RegExp.lastMatch);
        console.log("RegExp.lastParen ---> " + RegExp.lastParen);
        console.log("RegExp.multiple ---> " + RegExp.multiple);
        console.log("RegExp.$1 ---> " + RegExp.$1);
        console.log("RegExp.$2 ---> " + RegExp.$2);
    }
}

testRegExp();
regExpAttribute();
execTest();
testDemo();
regExpStaticDemo();


