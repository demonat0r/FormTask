const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');



gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./dist"
    });
});

gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('babeljs', function() {
    return gulp.src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', gulp.parallel('sass'));
    gulp.watch('src/js/*.js', gulp.parallel('babeljs'));
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));