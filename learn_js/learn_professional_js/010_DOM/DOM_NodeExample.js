var parentNode = document.getElementById("parent");
var child1 = document.getElementById("child1");
var child2 = document.getElementById("child2");

console.log("first node id --> " + parentNode.firstChild.id);
console.log("last node id --> " + parentNode.lastChild.id);
console.log("child1 next  id --> " + child1.nextSibling.id);
console.log("parentNode.firstChild prev  --> " + parentNode.firstChild.previousSibling);
console.log("child2 prev  id --> " + child2.previousSibling.id);

var newDiv = document.createElement("div");
newDiv.id = "myNewDiv";
newDiv.className = "box";
newDiv.innerHTML = "新的节点";

alert("appendChild child1");
parentNode.appendChild(child1);

alert("appendChild new div");
parentNode.appendChild(newDiv);

alert("insertBefore first");
parentNode.insertBefore(newDiv,parentNode.firstChild);

alert("insertBefore child1");
parentNode.insertBefore(newDiv,child1);
