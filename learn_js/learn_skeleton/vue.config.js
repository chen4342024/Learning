// const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');
// const path = require('path');

console.log(process.env.NODE_ENV);

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            // new SkeletonPlugin({
            //     pathname: path.resolve(__dirname, `./skeleton`), // 用来存储 shell 文件的地址
            //     staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
            //     routes: ['/', '/about'], // 将需要生成骨架屏的路由添加到数组中
            //     port: '9991'
            // })
        ]
    }
};
