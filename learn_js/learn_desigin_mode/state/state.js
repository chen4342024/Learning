var state = "start";
var playBtn = $(".J-play");
var stopBtn = $(".J-stop");

var video = {
    init: function () {
        this.stateList = {
            start: new StartState(this),
            play: new PlayState(this),
            pause: new PauseState(this),
        }
        this.changeState(this.stateList.start);
    },
    onPlay: function () {
        this.state.onPlay();
    },

    changeState: function (state) {
        this.state = state;
        this.state.refresh();
    },

    onStop: function () {
        this.state.onStop();
    }
}

function StartState(video) {
    this.video = video;
}

StartState.prototype = {
    refresh: function () {
        playBtn.removeClass("play");
        playBtn.removeClass("pause");
        playBtn.text("播放");
        stopBtn.addClass("disable");
        console.log("start");
    },
    onPlay: function () {
        var nextState = this.video.stateList.play;
        this.video.changeState(nextState);
    },
    onStop: function () {
        console.log("当前状态不可点");
    }
}

function PlayState(video) {
    this.video = video;
}

PlayState.prototype = {
    refresh: function () {
        playBtn.addClass("play");
        playBtn.removeClass("pause");
        playBtn.text("暂停");
        stopBtn.removeClass("disable");
        console.log("play");
    },
    onPlay: function () {
        var nextState = this.video.stateList.pause;
        this.video.changeState(nextState);
    },
    onStop: function () {
        var nextState = this.video.stateList.start;
        this.video.changeState(nextState);
    }
}

function PauseState(video) {
    this.video = video;
}

PauseState.prototype = {
    refresh: function () {
        playBtn.removeClass("play");
        playBtn.addClass("pause");
        playBtn.text("播放");
        stopBtn.removeClass("disable");
        console.log("pause");
    },
    onPlay: function () {
        var nextState = this.video.stateList.play;
        this.video.changeState(nextState);
    },
    onStop: function () {
        var nextState = this.video.stateList.start;
        this.video.changeState(nextState);
    }
}

playBtn.click(function () {
    video.onPlay();
});

stopBtn.click(function () {
    video.onStop();
});

video.init();