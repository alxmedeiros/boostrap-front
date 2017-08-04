'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');

const _srcDir = './_src/';
const _buildDir = './build/';

const _sassPath = _srcDir+'/sass';
const _cssPath = _buildDir+'/css';

gulp.task('sass', function () {
    return gulp.src(_sassPath+'/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(_cssPath));
});

gulp.task('sass:watch', function () {
    gulp.watch(_sassPath+'/**/*.scss', ['sass']);
});