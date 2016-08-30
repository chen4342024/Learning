var div = document.getElementById("parent");


function appendData() {
    div.firstChild.appendData("新文本 ！");
}

function deleteData() {
    div.firstChild.deleteData(1, 2);
}

function insertData() {
    div.firstChild.insertData(4, "新插入")
}

function replaceData() {
    div.firstChild.replaceData(4, 3, "新替换")
}

function splitText() {
    div.firstChild.splitText(4);
}

function substringData() {
    alert(div.firstChild.substringData(2, 5))
}

function testCreateElement() {
    var textNode = document.createTextNode("text created");
    div.appendChild(textNode);
}

function NodeListTest() {
    var divs = document.getElementsByTagName("div");
    var i = 0, div;
    for(i = 0 ; i < divs.length; i ++ ){
        div = document.createElement("div");
        document.body.appendChild(div);
    }
}