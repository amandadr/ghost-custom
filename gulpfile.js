const {series, parallel, watch, src, dest} = require('gulp');
const pump = require('pump');
const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const beeper = require('beeper');

// postcss plugins
const easyimport = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

function serve(done) {
    livereload.listen();
    done();
}

function handleError(done) {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

/**
 * Copy IBM Plex woff2 from @fontsource into assets/fonts (fonts.css references these paths).
 * Use fs.copyFileSync — gulp/vinyl can corrupt binary woff2 (OTS decode errors in the browser).
 * Theme zip must use the system `zip` command too — gulp-zip also routes through vinyl and mangles woff2.
 */
function fonts(done) {
    const sans = [
        'ibm-plex-sans-latin-400-normal.woff2',
        'ibm-plex-sans-latin-400-italic.woff2',
        'ibm-plex-sans-latin-600-normal.woff2',
        'ibm-plex-sans-latin-600-italic.woff2',
    ];
    const serif = [
        'ibm-plex-serif-latin-400-normal.woff2',
        'ibm-plex-serif-latin-400-italic.woff2',
        'ibm-plex-serif-latin-600-normal.woff2',
        'ibm-plex-serif-latin-600-italic.woff2',
    ];
    try {
        sans.forEach((name) => {
            fs.copyFileSync(
                path.join('node_modules/@fontsource/ibm-plex-sans/files', name),
                path.join('assets/fonts/ibm-plex-sans', name)
            );
        });
        serif.forEach((name) => {
            fs.copyFileSync(
                path.join('node_modules/@fontsource/ibm-plex-serif/files', name),
                path.join('assets/fonts/ibm-plex-serif', name)
            );
        });
    } catch (err) {
        return handleError(done)(err);
    }
    done();
}

function css(done) {
    const postcssPipeline = [
        easyimport,
        autoprefixer(),
        cssnano()
    ];
    pump([
        src('assets/css/screen.css', {sourcemaps: true}),
        postcss(postcssPipeline),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], (err) => {
        if (err) {
            return handleError(done)(err);
        }
        pump([
            src('assets/css/screen-home.css', {sourcemaps: true}),
            postcss(postcssPipeline),
            dest('assets/built/', {sourcemaps: '.'}),
            livereload()
        ], handleError(done));
    });
}

/** One ordered list → one src() stream so concat order matches file order (reframe before shared main.js). */
function jsEntryPaths(version) {
    const base = `node_modules/@tryghost/shared-theme-assets/assets/js/${version}`;
    const lib = `${base}/lib`;
    const entries = [
        `${lib}/dropdown.js`,
        `${lib}/lightbox.js`,
        `${lib}/pagination.js`,
        `${lib}/vendor/imagesloaded.pkgd.min.js`,
        `${lib}/vendor/photoswipe-ui-default.min.js`,
        `${lib}/vendor/photoswipe.min.js`,
        `${lib}/vendor/reframe.min.js`,
        `${base}/main.js`,
    ];
    if (fs.existsSync('assets/js/lib')) {
        fs.readdirSync('assets/js/lib')
            .filter((f) => f.endsWith('.js'))
            .sort()
            .forEach((f) => entries.push(path.join('assets/js/lib', f)));
    }
    entries.push('assets/js/main.js');
    return entries;
}

/** No lightbox / PhotoSwipe / reframe — for home, archive, tag, author (see default.hbs). */
function jsEntryPathsLite(version) {
    const base = `node_modules/@tryghost/shared-theme-assets/assets/js/${version}`;
    const lib = `${base}/lib`;
    const entries = [
        `${lib}/vendor/imagesloaded.pkgd.min.js`,
        `${lib}/dropdown.js`,
        `${lib}/pagination.js`,
        'assets/js/ghost-main-lite.js',
    ];
    if (fs.existsSync('assets/js/lib')) {
        fs.readdirSync('assets/js/lib')
            .filter((f) => f.endsWith('.js'))
            .sort()
            .forEach((f) => entries.push(path.join('assets/js/lib', f)));
    }
    entries.push('assets/js/main.js');
    return entries;
}

function js(done) {
    pump([
        src(jsEntryPaths('v1'), {sourcemaps: true}),
        concat('main.min.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function jsLite(done) {
    pump([
        src(jsEntryPathsLite('v1'), {sourcemaps: true}),
        concat('main-lite.min.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';
    const root = path.resolve(__dirname);
    const outPath = path.join(root, 'dist', filename);

    fs.mkdirSync(path.join(root, 'dist'), {recursive: true});
    if (fs.existsSync(outPath)) {
        fs.unlinkSync(outPath);
    }

    const args = [
        '-r',
        '-q',
        outPath,
        '.',
        '-x',
        'node_modules/*',
        '-x',
        'docs-site/*',
        '-x',
        'dist/*',
        '-x',
        '.git/*',
        '-x',
        'yarn-error.log',
        '-x',
        '.DS_Store',
    ];

    try {
        execFileSync('zip', args, {cwd: root, stdio: 'inherit'});
    } catch (err) {
        return handleError(done)(err);
    }
    done();
}

const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const cssWatcher = () => watch('assets/css/**/*.css', css);
const jsBoth = series(js, jsLite);
const jsWatcher = () => watch('assets/js/**/*.js', jsBoth);
const watcher = parallel(hbsWatcher, cssWatcher, jsWatcher);
const build = series(fonts, css, js, jsLite);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
