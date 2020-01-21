const path = require("path");
const { src, watch, dest, parallel } = require("gulp");
const less = require("gulp-less");
const if_ = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

console.log(process.argv);
const with_sourcemaps = () => !!process.env.DEBUG;
const renamer = path => {
  if (process.argv[3]) {
    path.basename = process.argv[3].slice(1);
  }
  return path;
};

const build = () =>
  src(__dirname + "/ckan/public/base/less/main.less")
    .pipe(if_(with_sourcemaps(), sourcemaps.init()))
    .pipe(less())
    .pipe(if_(with_sourcemaps(), sourcemaps.write()))
    .pipe(rename(renamer))
    .pipe(dest(__dirname + "/ckan/public/base/css/"));

const watchSource = () =>
  watch(
    __dirname + "/ckan/public/base/less/**/*.less",
    { ignoreInitial: false },
    build
  );


const jquery = () =>
  src(__dirname + '/node_modules/jquery/dist/jquery.js')
    .pipe(dest(__dirname + '/ckan/public/base/vendor'));

const bootstrap = () =>
  src(__dirname + '/node_modules/bootstrap/dist/**/*')
    .pipe(dest(__dirname + '/ckan/public/base/vendor/bootstrap'));

const bootstrapLess = () =>
  src(__dirname + '/node_modules/bootstrap/less/**/*')
    .pipe(dest(__dirname + '/ckan/public/base/vendor/bootstrap/less'));

const moment = () =>
  src(__dirname + '/node_modules/moment/min/moment-with-locales.js')
    .pipe(dest(__dirname + '/ckan/public/base/vendor'));


exports.build = build;
exports.watch = watchSource;
exports.updateVendorLibs = parallel(jquery, bootstrap, bootstrapLess, moment);
