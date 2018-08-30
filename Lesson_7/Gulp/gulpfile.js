var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false,
    })
});

gulp.task('styles', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expand' }))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src([
        'src/libs/jquery/jquery.min.js',
        'src/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function () {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/main.js', ['js']);
    gulp.watch('src/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
gulp.task('build', ['styles', 'js'], function () {
    return gulp.src(['!src/{scss,scss/**/*}','src/**'])
        .pipe(gulp.dest('build'))
});