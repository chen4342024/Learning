var outputDiv = document.getElementById('output');
var div = document.getElementById('parent');

var myPs = document.querySelector(".myP");
var myNamePs = document.querySelector("[name='nameP']");

console.log("queryselector my p --> %o" , myPs);
console.log("queryselector my myNamePs --> %o" , myNamePs);

var myPsAll = document.querySelectorAll(".myP");
var myNamePsAll = document.querySelectorAll("[name='nameP']");

console.log("queryselector my p all--> %o" , myPsAll);
console.log("queryselector my myNamePs all--> %o" , myNamePsAll);

