var parentDiv = document.getElementById("parent");
var myP = document.getElementsByClassName("myP");
var myParentP = parentDiv.getElementsByClassName("myP");

console.log("myP -->　%o", myP);
console.log("myParentP -->　%o", myParentP);

console.log("parentDiv -->　%s", JSON.stringify(parentDiv.classList));
parentDiv.classList.add("test");
console.log("parentDiv -->　%s", JSON.stringify(parentDiv.classList));
parentDiv.classList.remove("test");
console.log("parentDiv -->　%s", JSON.stringify(parentDiv.classList));
parentDiv.classList.toggle("test");
console.log("parentDiv -->　%s", JSON.stringify(parentDiv.classList));
console.log("parentDiv -->　%s", JSON.stringify(parentDiv.classList.contains("test")));


console.log("parentDiv -->　%s", JSON.stringify(parentDiv.dataset.id));
console.log("parentDiv -->　%s", JSON.stringify(parentDiv.dataset.parentid));

