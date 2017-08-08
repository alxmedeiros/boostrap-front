'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var print = require('gulp-print');
var image = require('gulp-image');
// var babel = require('gulp-babel');

// import gulp from 'gulp';
// import babel from 'gulp-babel';
// import sass from 'gulp-sass';
// import connect from 'gulp-connect';
// import autoprefixer from 'gulp-autoprefixer';
// import sourcemaps from 'gulp-sourcemaps';

const dirs = {
    src: './_src/',
    dest: './build/'
};

const paths = {
    src: `${dirs.src}/sass`,
    dest: `${dirs.dest}/css/`
};

gulp.task('sass', () => (
    gulp.src(paths.src+'/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload())
));

gulp.task('html', () => {
    gulp.src(dirs.dest+'*.html').pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src(dirs.src+'scripts/**/*.js')
        .pipe(print())
        // .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest(dirs.dest+'scripts/'))
        .pipe(connect.reload());
});

gulp.task('libs', function(){
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(print())
        .pipe(gulp.dest(dirs.dest+'scripts/libs'));
});

gulp.task('image', function () {
    gulp.src(dirs.src+'images/*')
        .pipe(image())
        .pipe(gulp.dest(dirs.dest+'images/'))
        .pipe(connect.reload());
});

gulp.task('fonts', function () {
    gulp.src([
        dirs.src+'fonts/**/*',
        './node_modules/font-awesome/fonts/*'
    ]).pipe(gulp.dest(dirs.dest+'fonts/'));
});

// gulp.task('es6', () => {
//     gulp.src(dirs.src+'scripts/*.js')
//         .pipe(gulp.dest(dirs.dest+'scripts/'))
//         .pipe(connect.reload());
// });

gulp.task('connect', () => {
    connect.server({
        root: 'build',
        livereload: {
            port: 35739
        }
    });
});

gulp.task('watch', () => {
    gulp.watch([paths.src+'**/*.scss'], ['sass']);
    gulp.watch([dirs.src+'scripts/*.js'], ['js']);
    gulp.watch([dirs.src+'images/*'], ['image']);
    gulp.watch([dirs.dest+'*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch', 'js', 'libs', 'image']);