const {series, watch, src, dest, parallel} = require('gulp');
const pump = require('pump');

// gulp plugins and utils
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var beeper = require('beeper');
var browserSync = require('browser-sync').create();

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

function serve(done) {
    browserSync.init({
        proxy: 'http://localhost:2368'
    });

    livereload.listen();
    done();
}

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs', '!node_modules/**/*.hbs']),
        livereload(),
        browserSync.stream()
    ], handleError(done));
}

function css(done) {
    var processors = [
        easyimport,
        customProperties({preserve: false}),
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];

    pump([
        src('assets/scss/*.scss', {sourcemaps: true}),
        sass().on('error', sass.logError),
        postcss(processors), //Om man vill köra postcss också??
        dest('assets/built/', {sourcemaps: '.'}),
        livereload(),
        browserSync.stream()
    ], handleError(done));
}

function js(done) {
    pump([
        src('assets/js/*.js', {sourcemaps: true}),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload(),
        browserSync.stream()
    ], handleError(done));
}

function zipper(done) {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**'
        ]),
        zip(filename),
        dest(targetDir)
    ], handleError(done));
}



const cssWatcher = () => watch('assets/scss/**', css);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs', '!node_modules/**/*.hbs'], hbs);
const watcher = parallel(cssWatcher, hbsWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;