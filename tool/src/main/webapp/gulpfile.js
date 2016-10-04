"use strict";

var gulp = require("gulp"),
	gutil = require("gulp-util"),
	sass = require("gulp-sass"),
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

// Clean
gulp.task("clean:dest", function() {
	return gulp.src("./dest/*")
		.pipe(vinylPaths(del));
});

// Librairies
gulp.task("lib", ["lib:js", "lib:js:rxjs", "lib:js:angular"]);

gulp.task("lib:js", ["clean:dest"], function() {
	return gulp.src([
			"./node_modules/core-js/client/shim.min.js",
			"./node_modules/zone.js/dist/zone.js",
			"./node_modules/reflect-metadata/Reflect.js",
			"./node_modules/systemjs/dist/system.src.js",
			"./systemjs.config.js"
		])
		.pipe(gulp.dest("./dest/lib"));
});

gulp.task("lib:js:rxjs", ["clean:dest"], function() {
	return gulp.src(["./node_modules/rxjs/**/*.js"])
		.pipe(gulp.dest("./dest/lib/rxjs"));
});

gulp.task("lib:js:angular", ["clean:dest"], function() {
	return gulp.src(["./node_modules/@angular/**/bundles/**.min.js"])
		.pipe(gulp.dest("./dest/lib/@angular"));
});

// Application
gulp.task("app", ["app:index", "app:js", "app:html", "app:webinf", "app:sakaitools", "app:sass", "app:img"]);

gulp.task("app:index", ["clean:dest"], function() {
	return gulp.src("./index.jsp")
		.pipe(gulp.dest("./dest"));
});

gulp.task("app:js", ["clean:dest"], function() {
	return gulp.src(["./app/*.ts"])
		.pipe(ts({
			"experimentalDecorators": true
		}))
		.pipe(gulp.dest("./dest/app"));
});

gulp.task("app:html", ["clean:dest"], function() {
	return gulp.src(["./app/*.html"])
		.pipe(gulp.dest("./dest/app"));
});

gulp.task("app:webinf", ["clean:dest"], function() {
	return gulp.src(["./WEB-INF/*"])
		.pipe(gulp.dest("./dest/WEB-INF"));
});

gulp.task("app:sakaitools", ["clean:dest"], function() {
	return gulp.src(["./tools/*"])
		.pipe(gulp.dest("./dest/tools"));
});

gulp.task("app:sass", ["clean:dest"], function() {
	return gulp.src("./sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./dest/css"));
});

gulp.task("app:img", ["clean:dest"], function() {
	return gulp.src("./img/*")
		.pipe(gulp.dest("./dest/img"));
});

// Build
gulp.task("build", ["lib", "app"]);

// Tomcat
gulp.task("tomcat", ["tomcat:copy"]);

gulp.task("tomcat:copy", ["build"], function() {
	return gulp.src(["./dest/**/*"])
		.pipe(gulp.dest(config.tomcatDir));
});