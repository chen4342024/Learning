//search方法
console.log('search方法 -------------------------');
(function () {
    var str = 'Visit Chen';
    console.log(str.search(/\s+chen/i));
})();

//replace方法
console.log('replace方法 -------------------------');
(function () {
    var str = 'Visit   Chen';
    console.log(str.replace(/\s+chen/i, "aaa"));
})();

//match方法
console.log('match方法 -------------------------');
(function () {
    var str = 'Visit   Chen  Chen';
    console.log(str.match(/\s+chen/i));
})();

//split方法
console.log('split方法 -------------------------');
(function () {
    var str = 'Visit   Chen   Chen';
    var reg = /\s+c/i;
    console.log(str.split(reg));
})();

//test方法
console.log('test方法 -------------------------');
(function () {
    var str = 'Visit   Chen';
    var reg = /\s+chen/i;
    var reg2 = /\s+chen/;
    console.log(reg.test(str));
    console.log(reg2.test(str));
})();


//exec方法
console.log('exec方法 -------------------------');
(function () {
    var str = 'Visit   Chen';
    var reg = /\s+chen/i;
    var reg2 = /\s+chen/;
    console.log(reg.exec(str));
    console.log(reg2.exec(str));
})();


console.log('compile 方法 -------------------------');
(function () {
    var str = "Every man in the world! Every woman on earth!";
    var patt = /man/g;
    console.log(str.replace(patt, "person"));
    patt = /(wo)?man/g;
    // patt.compile(patt);
    console.log(str.replace(patt, "person"));
})();

//修饰符
console.log('修饰符-------------------------');
(function () {
    var str = 'Visit   Chen \r\nChen\r\nChen';
    console.log(str.replace(/chen/i, "aaa")); //忽略大小写
    console.log(str.replace(/chen/ig, "aaa")); //忽略大小写，并替换所有匹配的
    console.log(str.replace(/^chen/igm, "aaa")); //忽略大小写，并替换所有行头
    console.log(str.replace(/^chen/ig, "aaa")); //忽略大小写，并替换所有行头，由于没有用m所以匹配不到
})();


//正则表达式模式
console.log('正则表达式模式-------------------------');
(function () {
    var str = 'hello world andy chen HHH 1234';
    //方括号用于查找某个范围内的字符
    console.log(str.replace(/[hel]/g, "a"));
    console.log(str.replace(/[0-9]/g, "a"));
    console.log(str.replace(/[a-z]/g, "a"));
    //括号
    console.log(str.replace(/(h|e)/g, "a"));
})();

//元字符
console.log('元字符-------------------------');
(function () {
    var str = 'hello world andy chen HHH 1234';
    console.log(str.replace(/\d/g, "#"));
    console.log(str.replace(/\s/g, "#"));
    console.log(str.replace(/\b/g, "#"));
})();

//量词
console.log('量词-------------------------');
(function () {
    var str = 'hello world andy chen HHH 1234';
    console.log(str.replace(/\d/, "#"));
    console.log(str.replace(/\d+/, "#"));
    console.log(str.replace(/\sH*/g, "#"));
})();