var gulp = require("gulp");
var uglify = require("gulp-uglify");
var browserify = require("gulp-browserify");
var sourcemaps = require("gulp-sourcemaps");
var header = require("gulp-header");
var moment = require("moment");
var shell = require("gulp-shell");
var gulpif = require("gulp-if");
var args = require("yargs").argv;

var IS_DEBUG = !!args.debug;
console.log("IS_DEBUG: ", IS_DEBUG);
console.log("--------------------");
var TPL_FILE_INFO = "echo '> (DEBUG " + (IS_DEBUG ? "on" : "off") + ") <%= file.path %>'";

var output = {
	// 汉字 -> unicode
	ascii_only: true
};

gulp.task("scripts", function () {
	gulp.src([
		"src/**/*.js"
		, "!src/lib/**/*.*"
	])
		.pipe(shell(TPL_FILE_INFO))
		//.pipe(sourcemaps.init())
		//.pipe(browserify({
		//	debug: IS_DEBUG
		//}))
		.pipe(gulpif(!IS_DEBUG, uglify({
			output: {
				ascii_only: true
			},
			compress: {
				drop_console: !IS_DEBUG
			}
		})))
		//.pipe(sourcemaps.write("./"))
		.pipe(header("/**\n * heatmap.js\n * @author oldj\n * @blog http://oldj.net\n * last update: "
			+ moment().format("YYYY-MM-DD HH:mm:ss") + "\n */\n"))
		.pipe(gulp.dest("build/"))
	;
});

gulp.task("default", function () {
	gulp.start("scripts");

	gulp.watch([
		"src/**/*.js"
	], ["scripts"]);

});
