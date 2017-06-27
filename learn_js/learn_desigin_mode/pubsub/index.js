//来，订阅一个
pubsub.subscribe('example1', function (data) {
    console.log(data);
});

//发布通知
pubsub.publish('example1', 'hello world!');
pubsub.publish('example1', "hello again");