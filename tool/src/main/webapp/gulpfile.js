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
    browserify    = require('browserify'),
    source        = require('vinyl-source-stream');
 

// Img task
gulp.task('img', function() {
  return gulp.src('./source/img/**/*')
  .pipe(gulp.dest( './dest/img'));
});

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
//    './node_modules/angular/angular.js',
//    './node_modules/typescript/lib/typescript.js',
//    './node_modules/reflect-metadata/Reflect.js',
//    './node_modules/zone.js/dist/zone.js',
//    './node_modules/angular-dynamic-locale/tmhDynamicLocale.min.js',
//    './node_modules/angular-promise-extras/angular-promise-extras.js',
//    './node_modules/angular-resource/angular-resource.min.js',
//    './node_modules/angular-sanitize/angular-sanitize.min.js',
//    './node_modules/angular-animate/angular-animate.min.js',
//    './node_modules/angular-ui-tree/dist/angular-ui-tree.js',
//    './node_modules/checklist-model/checklist-model.js',
//    './node_modules/angular-translate/dist/angular-translate.min.js',
//    './node_modules/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
//    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
//    './source/lib/angular-ui/ui-bootstrap-custom-tpls-1.1.0.js',
//    './source/lib/xeditable/xeditable.min.js',
//    './source/lib/ng-ckeditor-master/ng-ckeditor.js',
//    './source/lib/modernizr/modernizr-custom.js',
//    './node_modules/es6-shim/es6-shim.js',
//    './node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
    ])
  .pipe(concat('syllabuslib.js'))
  .pipe(gulp.dest( './dest/lib'));
});

// Jsp task
gulp.task('jsp', function() {
  return gulp.src('./source/index.jsp')
  .pipe(gulp.dest( './dest'));
});

// Template cache task
gulp.task('viewscache', function () {
  return gulp.src(['./source/components/**/*.html'])
    .pipe(templateCache({ module: 'templateModule' }))
    .pipe(gulp.dest('./source/js'));
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

//Js task
gulp.task('js', ['browserifywatch', 'viewscache'],  function() {    
    return gulp.src([ "source/js/app.js", "source/components/**/*.js", "source/js/*.js", "source/js/services/*.js", "source/bundle.js" ])
    .pipe(concat('opensyllabus.js'))
    .pipe(gulp.dest('./dest/js/'));
});


//gulp.task('browserify', ['ts'], function () {
//  // bootstrap.js is the entry point for now but at the end of the migration it should be app.js
//  return browserify('./source/js/bootstrap.js')
//  .bundle()
//  .on('error', function(g){
//    gutil.log(g);
//  })
//  //Pass desired output filename to vinyl-source-stream
//  .pipe(source('bundle.js'))
//  .pipe(gulp.dest('./source/bundle'));
//
//});
//
//
//gulp.task('browserifywatch', function () {
//  return browserify('./source/js/bootstrap.js')
//  .bundle()
//  .on('error', function(g){
//    gutil.log(g);
//  })
//  //Pass desired output filename to vinyl-source-stream
//  .pipe(source('bundle.js'))
//  .pipe(gulp.dest('./source/bundle'));
//
//});


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
  return sass('./source/components/opensyllabus/opensyllabus.scss', { sourcemap: true })
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


 
