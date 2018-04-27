var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var bytediff = require('gulp-bytediff');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var config = require('./gulp.json');

gulp.task('sass', function(){
    return gulp.src(config.app.stylesheets.paths)
        .pipe(sass())
        .pipe(gulp.dest(config.app.stylesheets.dist))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch(config.app.stylesheets.paths, ['sass']);
    gulp.watch(config.app.html.paths, browserSync.reload);
    gulp.watch(config.app.javascripts.global, browserSync.reload);
})

gulp.task('scripts', function() {
    return gulp.src(config.app.javascripts.paths)
        .pipe(concat('rulers.package.js'))
        .pipe(gulp.dest(config.app.javascripts.dist))
        .pipe(rename('rulers.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.app.javascripts.dist))
})

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})