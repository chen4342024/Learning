var arr = [1, 2, 3, 4, 5];
var arrNew = [].concat(arr);
console.log("arrNew ---> " + arrNew);
console.log("slice (1,3) ---> " + arrNew.slice(1, 3));
console.log("slice (1) ---> " + arrNew.slice(1));

console.log("start arrNew ---> " + arrNew);
arrNew.splice(1, 2);
console.log("after splice (1,2) ---> " + arrNew);
arrNew.splice(1, 2, '*', '*');
console.log("after splice (1,2,'*','*') ---> " + arrNew);

console.log('arr.lastIndexOf(2)--->' + arr.lastIndexOf(2));
console.log('arr.indexOf(2)--->' + arr.indexOf(2));

var sum = arr.reduce(function (prev, cur, index, array) {
    console.log(prev + "*" + cur);
    return prev * cur;
});
console.log('reduce sum --> ' + sum);