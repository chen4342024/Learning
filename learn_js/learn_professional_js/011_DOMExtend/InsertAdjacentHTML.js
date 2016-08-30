function beforebegin(){
    var div = document.getElementById("content");
    if (div.insertAdjacentHTML){
        div.insertAdjacentHTML("beforebegin", "<p>beforebegin</p>");
    } else {
        alert("insertAdjacentHTML() not supported in this browser");
    }
}

function afterBegin(){
    var div = document.getElementById("content");
    div.insertAdjacentHTML("afterBegin", "<p>afterBegin</p>");
}

function beforeend(){
    var div = document.getElementById("content");
    div.insertAdjacentHTML("beforeend", "<p>beforeend</p>");
}

function afterend(){
    var div = document.getElementById("content");
    div.insertAdjacentHTML("afterend", "<p>afterend</p>");
}