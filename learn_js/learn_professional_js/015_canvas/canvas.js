function preImage(url, callback) {
    callback = callback ||function(){}
    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.src = url;

    if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }

    img.onload = function () { //图片下载完毕时异步调用callback函数。
        callback.call(img);//将回调函数的this替换为Image对象
    };
}

preImage("123.jpeg");
preImage("123.jpg");
preImage("pattern.jpg");


var drawing = document.getElementById("drawing");
if (drawing.getContext) {
    var context = drawing.getContext("2d");
}

function drawingTest1() {
    context.strokeStyle = "#ff0000";
    context.lineWidth = 3;
    context.lineCap = "square";
    context.lineJoin = "butt";
    context.strokeRect(10, 10, 50, 50);
    context.fillStyle = "#0000ff";
    context.fillRect(70, 10, 50, 50);

    context.clearRect(80, 20, 20, 20);
}


function drawingTest2() {
    // 一弧度 = 180° / π
    // 1° = π / 180
    //所以，旋转360°等于 2*π 弧度
    context.beginPath();
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    context.moveTo(100, 100);
    context.lineTo(100, 15);

    context.moveTo(100, 100);
    context.lineTo(35, 100);

    context.stroke();
}

function drawingTest3() {
    context.beginPath();
    context.moveTo(120, 50);           // 创建开始点
    //context.lineTo(100, 20);          // 创建水平线
    context.arcTo(200, 50, 250, 200, 80); // 创建弧
    //context.lineTo(150, 120);         // 创建垂直线
    context.stroke();
}


function drawingText() {
    context.font = "bold 14px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("12", 100, 20);

    //context.textAlign = "start";
    //context.fillText("12", 100, 40);

    //context.textAlign = "end";
    //context.fillText("12", 100, 60);
}

function drawingText2() {
    context.beginPath();
    context.moveTo(0, 50);
    context.lineTo(800, 50);
    context.stroke();

    context.textAlign = "start";
    context.textBaseline = "top";
    var fontSize = 100;
    context.font = fontSize + "px Arial";
    while (context.measureText("Hello World").width > 300) {
        fontSize--;
        context.font = fontSize + "px Arial";
    }

    context.fillText("Hello World", 50, 50);
    context.strokeText("Font size is " + fontSize + "px", 10, 150)
}

function drawingTranslate() {
    context.beginPath();
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    context.translate(100, 100);
    context.rotate(1);

    context.moveTo(0, 0);
    context.lineTo(0, -85);

    context.moveTo(0, 0);
    context.lineTo(-65, 0);
    context.stroke();
}

function drawingSaveAndRestore() {
    context.fillStyle = "red";
    context.save();
    context.translate(100, 10);
    context.fillStyle = "blue";
    context.save();

    context.fillStyle = "green";
    context.fillRect(0, 0, 100, 200);

    context.restore();
    context.fillRect(10, 10, 100, 200);

    context.restore();
    context.fillRect(20, 0, 100, 200);
}

function drawingImage() {
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, 200, 200, 0, 0, 300, 300);
        var src = drawing.toDataURL();
        var canvasImg = new Image();
        canvasImg.src = src;
        document.body.appendChild(canvasImg);
        drawingImageData();
    };
    img.src = "123.jpg";
}

function drawingPattern() {
    var img = new Image();
    img.onload = function () {
        var pattern = context.createPattern(img, "no-repeat");
        context.fillStyle = pattern;
        context.fillRect(0, 0, 300, 300);
    };
    img.src = "123.jpg";
}

function drawingImageData() {
    var imageData = context.getImageData(0, 0, 50, 50);
    context.putImageData(imageData, 200, 300);
}

function drawingGrayFilter() {
    var img = document.images[0];
    context.drawImage(img, 0, 0);
    var imageData = context.getImageData(0, 0, img.width, img.height);
    var data = imageData.data;
    var red, green, blue, alpha, average;
    for (var i = 0, len = data.length; i < len; i += 4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        alpha = data[i + 3];
        average = Math.floor((red + green + blue) / 3);

        data[i] = red + average;
        data[i + 1] = green + average;
        data[i + 2] = blue + average;
    }
    imageData.data = data;
    context.putImageData(imageData, 0, img.height);
}

function drawingGlobalAlpha() {
    context.fillStyle = "red";
    context.fillRect(10, 10, 50, 50);
    context.globalAlpha = 0.5;
    context.fillStyle = "blue"
    context.fillRect(30, 30, 50, 50);
    context.globalAlpha = 0;
}

function drawingCompositeOperation() {
    var attrs = ["source-over", "source-in", "source-out", "source-atop",
        "destination-over", "destination-in", "destination-out", "destination-atop",
        "lighter", "copy", "xor"];
    for (var i = 0; i < attrs.length; i++) {
        var button = document.createElement("button");
        button.value = attrs[i];
        button.className = "attr-btn";
        button.textContent = attrs[i];
        //document.body.appendChild(button);
        reDrawImage(attrs[i], i);
    }


    function reDrawImage(value, i) {
        var x = [
            [10, 10],
            [70, 10],
            [130, 10],
            [200, 10],
            [260, 10],
            [320, 10],
            [380, 10],
            [10, 70],
            [70, 70],
            [130, 70],
            [200, 70],
            [260, 70],
            [320, 70],
            [380, 70],
        ];
        var xy = x[i];

        context.fillStyle = "red";
        context.fillRect(xy[0], xy[1], 50, 50);

        context.globalCompositeOperation = value;

        context.fillStyle = "blue";
        context.fillRect(xy[0] + 20, xy[1] + 20, 50, 50);
    }

    //reDrawImage("source-over");


}


//drawingTest1();
//drawingTest2();
//drawingTest3();
//drawingText();
//drawingText2();
//drawingTranslate();
//drawingSaveAndRestore();
//drawingImage();
//drawingPattern();
//drawingImage();
drawingGrayFilter();
//drawingGlobalAlpha();
//drawingCompositeOperation();