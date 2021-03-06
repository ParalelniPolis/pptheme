var gulp = require('gulp');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var base64 = require('gulp-base64');
var http = require('http');
var st = require('st');

var PATHS = {
    VENDOR_CSS : [
        './node_modules/normalize.css/normalize.css',
        './src/css/fontello.css'
    ],
    CSS : [
        './src/css/app.css',
        './src/css/components/*.css'
    ],
    JS : [
        './src/js/init.js',
        './src/js/*.js'
    ],
    FONTS : [
        './src/font/**.*'
    ],
    IMAGES : [
        './src/images/*.jpg',
        './src/images/*.svg',
        './src/images/*.gif',
        './src/images/*.png'
    ],
    FAVICON : [
        './src/images/favicon.ico'
    ]
}

gulp.task('favicon', function() {
    return gulp.src(PATHS.FAVICON)
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('stylelint', function() {
    return gulp.src(PATHS.CSS)
        .pipe(postcss([
            require('stylelint')(),
            require('postcss-reporter')({
                    clearMessages: true,
                    throwError: true
            })
        ]));
});

gulp.task('styles', ['stylelint', 'images'], function() {
    return gulp.src(PATHS.VENDOR_CSS.concat(PATHS.CSS))
        .pipe(postcss([
            require('postcss-import')(),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('cssnano')({
                    unused: false,
                    reduceIdents: false,
                    mergeIdents: false,
                    zindex: false
            }),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')({
                    clearMessages: true,
                    throwError: true
            })
        ]))
        .pipe(base64({
            baseDir: './',
            extensions: ['png'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function() {
    return gulp.src(PATHS.JS)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('fonts', function() {
    return gulp.src(PATHS.FONTS)
        .pipe(gulp.dest('./dist/font/'));
});

gulp.task('images', function() {
    return gulp.src(PATHS.IMAGES)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('watch', function() {
    watch('./src/**', batch(function(events, done) {
        gulp.start('build', done);
    }));
});

gulp.task('build', ['styles', 'scripts', 'fonts', 'favicon']);
gulp.task('default', ['build']);
