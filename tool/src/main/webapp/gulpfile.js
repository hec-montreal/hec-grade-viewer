"use strict";

var gulp = require("gulp"),
	gutil = require("gulp-util"),
	sass = require("gulp-ruby-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	concat = require("gulp-concat"),
	sourcemaps = require("gulp-sourcemaps"),
	templateCache = require("gulp-angular-templatecache"),
	ts = require("gulp-typescript"),
	browserify = require("browserify"),
	del = require("del"),
	vinylPaths = require('vinyl-paths'),
	// Build config
	config = require("./gulp.config.json");

// Clean dest
gulp.task("clean:dest", function () {
	return gulp.src(["./dest/*"]).
		pipe(vinylPaths(del));
});

// Copy JS libs
gulp.task("lib", ["lib:js:rxjs", "lib:js:angular"], function() {
	return gulp.src([
		"./node_modules/core-js/client/shim.min.js",
		"./node_modules/zone.js/dist/zone.js",
		"./node_modules/reflect-metadata/Reflect.js",
		"./node_modules/systemjs/dist/system.src.js",
		"./systemjs.config.js"])
		.pipe(gulp.dest("./dest/lib"));
});

gulp.task("lib:js:rxjs", function () {
	return gulp.src(["./node_modules/rxjs/**/*.js"])
		.pipe(gulp.dest("./dest/lib/rxjs"));
});

gulp.task("lib:js:angular", function() {
	return gulp.src(["./node_modules/@angular/**/bundles/**.min.js"])
		.pipe(gulp.dest("./dest/lib/@angular"));
});

// Copy JSP
gulp.task("app", ["app:js", "app:webinf", "app:tools"], function() {
	return gulp.src("./index.jsp")
		.pipe(gulp.dest("./dest"));
});

// App
gulp.task("app:js", function () {
	return gulp.src(["./app/*.ts"])
		.pipe(ts({"experimentalDecorators": true}))
		.pipe(gulp.dest("./dest/app"));
});

//Web-Inf
gulp.task("app:webinf", function() {
	return gulp.src(["./WEB-INF/*"])
		.pipe(gulp.dest("./dest/WEB-INF"));
});

//Sakai Tools
gulp.task("app:tools", function() {
	return gulp.src(["./tools/*"])
		.pipe(gulp.dest("./dest/tools"));
});

//Sass
gulp.task("sass", function() {
	return sass("./source/scss/*.scss", {
			sourcemap: true
	})
		.on("error", sass.logError)
		.pipe(autoprefixer({
			browsers: ["last 2 versions"]
		}))
		.pipe(gulp.dest("./dest/css"));
});

// Copy to tomcat
gulp.task("tomcat:copy", function() {
	return gulp.src(["./dest/**/*"])
		.pipe(gulp.dest(config.tomcatDir));
});

gulp.task("tomcat", ["clean:dest", "lib", "app", "tomcat:copy"], function() {
	gutil.log("Source deployed");
});
