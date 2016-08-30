var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync');

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});


//通过FTP发布到服务器
gulp.task('deploy', function () {
    var conn = ftp.create({
        host: 'ftp.vapps.com.cn',
        user: 'ftp.vapps.com.cn|VappsWebFtp',
        password: 'Vapps510000',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'css/**/*',
        'img/**/*',
        'js/**/*',
        'lib/**/*',
        'page/**/*',
        'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
    //http://www.vapps.com.cn/html5/test/MuDanTing/#/home/
    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(conn.newer('/html5/test/MuDanTing')) // only upload newer files
        .pipe(conn.dest('/html5/test/MuDanTing'));
});

gulp.task('imagemin', function () {
    gulp.src('dist/testImg/photo1.jpg')
        .pipe(imagemin({
            //optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            //progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            //interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            //multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
            //use: [pngquant({quality: '65-80'})]
        }))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('browser-sync', function() {
    browserSync({
        files: ["css/*.css",'js/*.js','./index2.html'],
        server: {
            baseDir: "./"
        }
    });
});