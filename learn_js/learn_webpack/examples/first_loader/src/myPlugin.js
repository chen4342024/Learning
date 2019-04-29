// 一个 JavaScript 命名函数。
function HelloWorldPlugin() {}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
HelloWorldPlugin.prototype.apply = function(compiler) {
    // compiler 对象代表了完整的 webpack 环境配置。
    // 这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。
    // 当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

    // 设置回调来访问 compilation 对象：
    compiler.plugin('compilation', function(compilation) {
        // 现在，设置回调来访问 compilation 中的步骤：
        console.log('compilation');

        compilation.plugin('optimize', function() {
            console.log('Assets are being optimized.');
        });
    });

    compiler.plugin('emit', function(compilation, callback) {
        // 现在，设置回调来访问 compilation 中的步骤：
        console.log('emit');
        // 在生成文件中，创建一个头部字符串：
        var filelist = 'In this build:\n\n';

        // 遍历所有编译过的资源文件，
        // 对于每个文件名称，都添加一行内容。
        for (var filename in compilation.assets) {
            filelist += '- ' + filename + '\n';
        }

        // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
        compilation.assets['filelist.md'] = {
            source: function() {
                return filelist;
            },
            size: function() {
                return filelist.length;
            }
        };

        callback();
    });

    compiler.plugin('done', function() {
        console.log('Hello World! done');
    });
};

export default HelloWorldPlugin;
