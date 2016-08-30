var test = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num + f(num - 1);
    }
});
var test2 = test;
test = null;
console.log("test2(5); ---> %s",test2(5));