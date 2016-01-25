// LIBRARIES

// Include gulp
var gulp        = require('gulp'); 

// Include our plugins
var jshint      = require('gulp-jshint');
var compass     = require('gulp-compass');
var plumber     = require('gulp-plumber');
var minifyCSS   = require('gulp-minify-css');
// var sass     = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var livereload  = require('gulp-livereload');
// var http     = require('http');
// var st       = require('st');
var runSequence = require('run-sequence');
var rimraf      = require('rimraf');

// PATHS

var paths = {
    assets: [
        './source/**/*.*',
        '!./source/pages/**/*.*',
        '!./source/{scss,javascripts}/**/*.*'
    ],
    uploader: [
        './source/components/uploader/**/*.*',
        '!./source/components/uploader/{scss,javascripts}/**/*.*'
    ],
    grid: [
        './source/components/grid/**/*.*',
        '!./source/components/grid/{scss,javascripts}/**/*.*'
    ],
    blankPage: [
        './source/components/blankPage/**/*.*',
        '!./source/components/blankPage/{scss,javascripts}/**/*.*'
    ],
    blankPage2: [
        './source/components/blankPage2/**/*.*',
        '!./source/components/blankPage2/{scss,javascripts}/**/*.*'
    ],
    sass: [
        'source/scss',
        'source/components/uploader/scss',
        'source/components/grid/scss',
        'source/components/blankPage/scss',
    ],
    js: [
        'bower_components/modernizr/src/modernizr.js',
        'bower_components/jquery/dist/jquery.js'
    ]
}

// TASKS

// Lint task
gulp.task('lint', function() {
    return gulp.src('source/javascripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile sass with compass
gulp.task('compass', function() {
  gulp.src('source/scss/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: 'source/stylesheets',
      sass: 'source/scss',
      image: 'source/images'
    }))
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('source/stylesheets/min'))
    .pipe(livereload());
});

// Compile uploader component sass with compass
gulp.task('uploader', function() {
  gulp.src('source/components/uploader/scss/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: 'source/components/uploader/stylesheets',
      sass: 'source/components/uploader/scss',
      image: 'source/components/uploader/images'
    }))
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('source/components/uploader/stylesheets/min'))
    .pipe(livereload());
});
// Watch files for uploader changes
gulp.task('watchUploader', function() {
    livereload.listen();
    gulp.watch('source/components/uploader/scss/*.scss', ['uploader']);
});

// Compile grid component sass with compass
gulp.task('grid', function() {
  gulp.src('source/components/grid/scss/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: 'source/components/grid/stylesheets',
      sass: 'source/components/grid/scss',
      image: 'source/components/grid/images'
    }))
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('source/components/grid/stylesheets/min'))
    .pipe(livereload());
});
// Watch files for grid changes
gulp.task('watchGrid', function() {
    livereload.listen();
    gulp.watch('source/components/grid/scss/*.scss', ['grid']);
});

// Compile blankPage component sass with compass
gulp.task('blankPage', function() {
  gulp.src('source/components/blankPage/scss/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: 'source/components/blankPage/stylesheets',
      sass: 'source/components/blankPage/scss',
      image: 'source/components/blankPage/images'
    }))
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('source/components/blankPage/stylesheets/min'))
    .pipe(livereload());
});
// Watch files for blankPage changes
gulp.task('watchBlankPage', function() {
    livereload.listen();
    gulp.watch('source/components/blankPage/scss/*.scss', ['blankPage']);
});

// Compile blankPage2 component sass with compass
gulp.task('blankPage2', function() {
  gulp.src('source/components/blankPage2/scss/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: 'source/components/blankPage2/stylesheets',
      sass: 'source/components/blankPage2/scss',
      image: 'source/components/blankPage2/images'
    }))
    .on('error', function(err) {
      // Would like to catch the error here 
    })
    .pipe(minifyCSS())
    .pipe(gulp.dest('source/components/blankPage2/stylesheets/min'))
    .pipe(livereload());
});
// Watch files for blankPage2 changes
gulp.task('watchBlankPage2', function() {
    livereload.listen();
    gulp.watch('source/components/blankPage2/scss/*.scss', ['blankPage2']);
});

// Compile sass with sass
/* gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('stylesheets'));
}); */

// Concatenate & minify js
gulp.task('scripts', function() {
    return gulp.src('source/javascripts/*.js')
        .pipe(concat('source/script/all.js'))
        .pipe(gulp.dest('source/script'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('source/script'));
});

// Watch files for changes
// gulp.task('watch', ['server'], function() {
gulp.task('watch', function() {
    // livereload.listen({ port: 1234, basePath: 'dist' });
    livereload.listen();
    // livereload.listen({ basePath: '' });
    gulp.watch('source/javascripts/*.js', ['lint', 'scripts']);
    // gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('source/scss/*.scss', ['compass']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/', index: 'index.html', cache: false })
  ).listen(8080, done);
});

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./dist', cb);
});

// Copies everything in the source folder except scss & js
gulp.task('copy', function() {
    return gulp.src(paths.assets, {
        base: './source/'
    })
        .pipe(gulp.dest('./dist'))
    ;
});

// Default task
// gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
gulp.task('default', ['lint', 'compass', 'scripts', 'watch']);

gulp.task('build', function(cb) {
    runSequence('clean', ['copy', 'compass'], cb);
});

