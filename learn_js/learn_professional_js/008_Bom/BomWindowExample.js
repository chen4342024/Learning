var a = "a";
window.b = "b";

console.log(Object.getOwnPropertyDescriptor(window, 'a'));
console.log(Object.getOwnPropertyDescriptor(window, 'b'));

delete b;
delete a;
console.log("a --> " + window.a);
console.log("b --> " + window.b);

//适用于所有浏览器
if(someNode.nodeType == 1){
    alert("Node is an element")
}