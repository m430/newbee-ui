var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

var paths = {
  js_newbee:   './src/**/*.js',
  js_doc: './doc/app/**/*.js',
  sass_newbee: './src/**/*.scss',
  sass_doc: './doc/scss/**/*.scss',
};

// ---------------------------------------------------- sass
gulp.task('sass-doc', function() {
  gulp.src('./doc/scss/app.scss')
    .pipe(sass())
    .on( "error", handleError)
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./doc/build/'))
    .pipe(livereload());
});
gulp.task('sass-newbee', function() {
  gulp.src('./src/_scss/newbee.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/'))
    // dest newbee to doc
    .pipe(gulp.dest('./doc/build/'))
    .pipe(livereload());
});

// ---------------------------------------------------- js
gulp.task('js-newbee', function() {
  gulp.src(paths.js_newbee)
    .pipe(concat('newbee.js'))
    .pipe(uglify({
      compress:true,
      mangle:false,
    })) 
    .pipe(gulp.dest('./build/'))
    // dest to doc
    .pipe(gulp.dest('./doc/build/'));
});

gulp.task('js-doc', function() {
  gulp.src(paths.js_doc)
    .on( "error", handleError)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./doc/build/'));
});

// --------------------------------------------------------------watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.js_doc,['js-doc']);
    gulp.watch(paths.js_newbee,['js-newbee']);
    gulp.watch(paths.sass_doc, ['sass-doc']);
    gulp.watch(paths.sass_newbee, ['sass-newbee']);
});

// ---------------------------------------- production -------------
gulp.task('build', ['sass-newbee','js-newbee', 'sass-doc', 'js-doc']); 
gulp.task('default', ['build','watch']);

// --------- utils ------------
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


