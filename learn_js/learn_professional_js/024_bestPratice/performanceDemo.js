function updateUI() {
    var images = document.getElementsByTagName("img");
    for (var i = 0, len = images.length; i < len; i++) {
        images[i].title = document.title + " images " + i;
    }
    var msg = document.getElementById("msg");
    msg.innerHTML = "Update complete";
}