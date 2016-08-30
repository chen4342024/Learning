function start() {

}


function insertNormal() {
    var div = document.getElementById("content");
    console.time("insertNormal");
    for (var i = 0; i < 1000; i++) {
        div.innerHTML += "<p>这是第" + i + "  行数据</p>"
    }
    console.timeEnd("insertNormal");
}


function insertBetter() {

    var div = document.getElementById("content");
    div.innerHTML = "";
    console.time("insertBetter");
    var newHTML = "";
    for (var i = 0; i < 1000; i++) {
        newHTML += "<p>这是第" + i + "  行数据</p>"
    }
    div.innerHTML += newHTML;
    console.timeEnd("insertBetter");
}