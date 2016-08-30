var nomalBtn = document.getElementById("nomalBtn");
var clearBtn = document.getElementById("clearBtn");
nomalBtn.addEventListener("click", function () {
    loop(1);
    startInterval();
}, false);

clearBtn.addEventListener("click", function () {
    clearInterval(intervalId);
}, false);


function startInterval() {
    var startTime = Date.now();
    var lastTime = startTime;
    intervalId = setInterval(function () {
        loop(1);
        var now = Date.now();
        var intervalTime = now - startTime;
        lastTime = now;
        console.log("time interval  ---> " + intervalTime);
    }, 20);
}


function loop(time) {
    var i = 0;


    while (i < 1000000 * time) {
        i++;
    }
    console.log("loop" + i);
}