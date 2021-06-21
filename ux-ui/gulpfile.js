// list dependencies
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');

// function
function compilecss(){
    return src('./media/**/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(rename(function (path) {
        return {
            dirname: path.dirname + "",
            basename: path.basename + ".min",
            extname: ".css"
        };
    }))
    .pipe(dest('./media/'))
};

// watchtask
function watchTask(){
    watch('./media/**/*.scss', compilecss);
}

// default gulp task
exports.default = series(
    compilecss,
    watchTask
);