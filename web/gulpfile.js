var gulp = require('gulp');
//html
var htmlmin = require('gulp-htmlmin');
var useref = require('gulp-useref');
//css
var minifyCss = require('gulp-minify-css');
// css+ js
var concat = require('gulp-concat');
//js uglify
var uglify = require('gulp-uglify');
//判断
var gulpIf = require('gulp-if');
//记录依赖
var rev = require('gulp-rev');
//
//收集依赖替换
var collector = require('gulp-rev-collector');
//
//img
var imageMin = require('gulp-imagemin');
//
//改名
var rename = require('gulp-rename');


var ngHtml2Js = require("gulp-ng-html2js");





//html
gulp.task('html', function() {
    var htmlOptions = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src('./src/views/*.html', { base: './src' })
        .pipe(htmlmin())
        .pipe(ngHtml2Js({
            moduleName: "MyAwesomePartials",
            prefix: "/" //整个缓存名称要与请求一致，就不发请求
        }))
        .pipe(concat('template.js'))
        .pipe(rev()) //对于当前读取的文件生成数字签名
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest()) // 生成数字签名相关的清单文件
        .pipe(rename('html-manifest.json'))
        .pipe(gulp.dest('dist/rev'))
});


//css js
gulp.task('useref', function() {
    return gulp.src('./src/index.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.js', rev())) //根据在index.html中的声明生成文件，包含数字签名，
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(gulpIf('*.css', rev()))
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest()) //数字签名和原始文件的关联清单
        .pipe(rename('css-js-manifest.json'))
        .pipe(gulp.dest('dist/rev'))

});

//替换
//img
gulp.task('img', function() {
    return gulp.src(['./src/img/*.*', './src/css/img/*.*', './src/files/*', './src/fonts/*.*'], { base: './src' }) //base属性代表移动到dist目录的时候，不需要生成src目录
        .pipe(gulp.dest('dist'))
})

gulp.task('fonts', function() {
    return gulp.src('./src/vender/bootstrap/fonts/*.*', { base: './src/vender/bootstrap' })
        .pipe(gulp.dest('dist'))

})


gulp.task('default', ['img', 'html', 'useref', 'fonts'], function() {
    gulp.src(['./dist/rev/html-manifest.json', './dist/js/*.js'])
        .pipe(collector())
        .pipe(gulp.dest('dist/js'));

    gulp.src(['./dist/rev/*.json', './dist/index.html'])
        .pipe(collector())
        .pipe(gulp.dest('dist'));

})
