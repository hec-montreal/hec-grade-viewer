'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    config       = require('./config.json'),
    sourcemaps   = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    // embedTemplates = require('gulp-angular-embed-templates'),
    //uglify        = require('gulp-uglify'),
    // browserify    = require('gulp-browserify'),
    ts            = require('gulp-typescript'),
    browserify    = require('browserify');
    //source        = require('vinyl-source-stream');
 


// Locale  task
gulp.task('locale', function() {
  return gulp.src([
    './node_modules/angular-i18n/angular-locale_fr-ca.js',
    './node_modules/angular-i18n/angular-locale_en-ca.js'
    ])
  .pipe(gulp.dest( './dest/lib/locale'));
});


// lib css task
gulp.task('csslib', function() {
  return gulp.src([
    './source/lib/bootstrap/css/bootstrap.css',
    './source/lib/angular-ui-tree/angular-ui-tree.min.css'
    ])
  .pipe(gulp.dest( './dest/lib/css'));
});

// lib css task
gulp.task('fonts', function() {
  return gulp.src([
    './source/lib/bootstrap/fonts/*'
    ])
  .pipe(gulp.dest( './dest/lib/fonts'));
});


// Concat all lib and nodes modules
gulp.task('jslib', function() {
  return gulp.src([
   './node_modules/core-js/client/shim.min.js',
   './node_modules/zone.js/dist/zone.js',
   './node_modules/reflect-metadata/Reflect.js',
   './node_modules/systemjs/dist/system.src.js',
   './node_modules/@angular/*'
    ])
  .pipe(gulp.dest( './dest/lib'));
});

// Jsp task
gulp.task('jsp', function() {
  return gulp.src('./source/index.jsp')
  .pipe(gulp.dest( './dest'));
});


//Ts tasks
gulp.task('module', function() {
    return gulp.src([ 
     'source/module/*.ts'
     ])
    .pipe(ts({
      'experimentalDecorators' : true
    }))
    .pipe(gulp.dest('./dest/module'));
});

gulp.task('component', function() {
    return gulp.src([ 
     'source/component/*.ts',
     ])
    .pipe(ts({
      'experimentalDecorators' : true
    }))
    .pipe(gulp.dest('./dest/component'));
});

gulp.task('app', function() {
    return gulp.src([ 
     'source/*.ts',
     ])
   .pipe(ts({
      'experimentalDecorators' : true
    }))
    .pipe(gulp.dest('./dest'));
});

//SAKAI TOOL RELATED - web-inf task
gulp.task('web-inf', function() {
    return gulp.src(['./WEB-INF/*'])
    .pipe(gulp.dest('./dest/WEB-INF'));
});

//SAKAI TOOL RELATED - tool task
gulp.task('tools', function() {
    return gulp.src(['./tools/*'])
    .pipe(gulp.dest('./dest/tools'));
});

//sass task
gulp.task('sass', function () {
  return sass('./source/scss/*.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest( './dest/css'));
});


// Copy
gulp.task('copy', function () {
    return gulp.src(['./dest/**/*'])
     .pipe(gulp.dest(config.tomcat));
});



gulp.task('copy-deploy',['deploy-maven'] , function(){
  gutil.log('Source déployée sur tomcat!');
  
  return gulp.src(['./dest/**/*'])
  .pipe(gulp.dest(config.tomcat));
});

gulp.task('deploy-maven',['module', 'component', 'app', 'jslib', 'web-inf','tools','jsp', 'copy'] , function(){
	  gutil.log('Source déployée sur tomcat avec maven!');
});


 
