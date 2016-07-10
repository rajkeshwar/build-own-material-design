'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var html2jade = require('gulp-html2jade');
var cssbeautify = require('gulp-cssbeautify');
var browserSync = require('browser-sync').create();
var stripCssComments = require('gulp-strip-css-comments');

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(stripCssComments())
    .pipe(cssbeautify({
        indent: '  ',
        autosemicolon: true
    }))
    .pipe(gulp.dest('./src/.'));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./**/*.scss', ['sass']);
// });

//var sourceCompDir = './src/badge/';

gulp.task('jade', function(){
  gulp.src('./src/**/*.html')
    .pipe(html2jade({nspaces:2}))
    .pipe(gulp.dest('./src/.'));
});

// gulp.task('html', function(){
//     return gulp.src(sourceCompDir + '/snippets/*.html')
//         .pipe(concat('all.html'))
//         .pipe(gulp.dest(sourceCompDir + 'snippets/'));
// });

// Static Server + watching scsss/html files
gulp.task('serve', ['sass', 'jade'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./src/**/*.html', ['jade']);
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
    gulp.watch('./src/**/*.css').on('change', browserSync.reload);
});