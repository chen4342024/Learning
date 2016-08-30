function outer() {
    inner();
}

function inner() {
    console.log("arguments.callee.caller --> " + arguments.callee.caller.name)
}


outer();

var type = "window";

var o = {
    type: "o"
};
var oLog = log.bind(o);
function log() {
    console.log("type--->" + this.type);
}

log();
oLog();
oLog.call(this);