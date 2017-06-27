var state = "start";
var playBtn = $(".J-play");
var stopBtn = $(".J-stop");

var video = {

    num: 0,
    init: function () {
        playBtn.addClass("play");
        stopBtn.addClass("disable");
    },
    onPlay: function () {
        if (playBtn.hasClass("play")) {
            playBtn.removeClass("play");
            playBtn.addClass("pause");
            playBtn.text("播放");
            console.log("pause");
        } else if(asdf) {
            playBtn.addClass("play");
            playBtn.removeClass("pause");
            playBtn.text("暂停");
            console.log("play");
        }
        stopBtn.removeClass("disable")
    },

    onStop: function () {
        if (playBtn.hasClass("play")) {
            playBtn.removeClass("play");
            playBtn.removeClass("pause");
            playBtn.text("播放");
        }
        stopBtn.addClass("disable");
        console.log("stop");
    }
}

playBtn.click(function () {
    video.onPlay();
});

stopBtn.click(function () {
    video.onStop();
});

video.init();