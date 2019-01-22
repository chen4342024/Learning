var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server });

// 连接池
var clients = [];

wss.on('connection', function(ws) {
    console.log('connection');
    // 将该连接加入连接池
    clients.push(ws);
    ws.on('message', function(message) {
        // 广播消息
        clients.forEach(function(ws1) {
            if (ws1 !== ws) {
                ws1.send(message);
            }
        });
    });

    ws.on('close', function(message) {
        // 连接关闭时，将其移出连接池
        clients = clients.filter(function(ws1) {
            return ws1 !== ws;
        });
    });
});

app.use(express.static(path.join(__dirname, '/public')));

app.listen(8080, () => {
    console.log('Listening on http://localhost:8080 ');
});
