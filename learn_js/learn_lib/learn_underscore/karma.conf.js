module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],//,'IE'
        frameworks: ['jasmine'],
        files: [
            'underscore-chen/chen-underscore.js',
            'underscore-chen/test/**/*.spec.js'
        ],
        port: 9877,

        //配置输出方式, 第二个为kjhtml 的时候，弹出chrome里，debug页面才不会空白
        reporters: ['progress', 'kjhtml', 'coverage'],

        //html格式输出
        htmlReporter: {
            outputDir: 'karma_html', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false, // reports start folded (only with preserveDescribeNesting)
        },

        //配置覆盖的路径
        // 不配置覆盖的路径的话，可以查看源码和断点调试
        //preprocessors: {
        //    'underscore.js': 'coverage'
        //},

        //配置检查覆盖率的输出
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        //修复改变文件时会触发删除的bug
        usePolling: true
    });
};