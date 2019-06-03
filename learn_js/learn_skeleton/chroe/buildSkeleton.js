const getSkeleton = require('../libs/skeleton/getSkeleton');

getSkeleton({
    name: 'index',
    url: 'http://172.16.222.214:8080/index.html#/',
    // url: 'https://market.m.taobao.com/app/nozomi/app-free-shipping/main/index.html',
    outputPath: './skeleton',
    storage: { token: '123123' }
});

getSkeleton({
    name: 'home',
    url: 'http://172.16.222.214:8080/index.html#/',
    // url: 'https://market.m.taobao.com/app/nozomi/app-free-shipping/main/index.html',
    outputPath: './skeleton',
    storage: { token: '123123' }
});
