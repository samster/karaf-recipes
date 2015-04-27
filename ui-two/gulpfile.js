var gulp = require('gulp'), // not a gulp plugin, so have to manually load it like normal node modules
    browserSync = require('browser-sync'),
    url = require('url'),
    del = require('del'),
    runSequence = require('run-sequence'),
    args = require('yargs').argv;
    proxy = require('proxy-middleware'),
    mainBowerFiles = require('main-bower-files'),
    plugins = require('gulp-load-plugins')(); // loads all plugins listed in package.json


var srcAppJs = './src/main/webapp/client/**/*.js';
var tempTemplatecacheFile = './target/temp/templates.js';
var srcAppCss = './src/main/webapp/client/styles/**/*.scss';
var srcIndexHtml = './src/main/webapp/client/index.html';
var srcHtmlTemplates = './src/main/webapp/client/app/**/*.html';
var stageDir = './target/stage/ui-two/';
var stageLibDir = stageDir + 'lib';
var stageStylesDir = stageDir + '/styles/';
var production = !!(args.production); // true if --production flag is used

/**
 * Process jshint on code
 */
gulp.task('process-jshint', function() {
    return gulp
        .src([
            './src/**/*.js'
        ])
        .pipe(plugins.plumber({errorHandler: onError}))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.jscs());
});

/**
 * Process vendor js files
 */
gulp.task('process-vendor-js', ['clean-vendor-js'], function() {
    return gulp
        .src(mainBowerFiles({filter: "**/*.js"}),{ base: './bower_components' })
        .pipe(plugins.if(!production, plugins.sourcemaps.init()))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.if(!production, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(stageLibDir))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Cleans vendor js files
 */
gulp.task('clean-vendor-js', function(done) {
    clean(stageLibDir + 'vendor.min.js', done);
});

/**
 * Process application js files
 */
gulp.task('process-app-js', ['clean-app-js', 'process-templatecache', 'process-jshint'], function() {
    return gulp
        .src([srcAppJs, tempTemplatecacheFile])
        .pipe(plugins.filter(['**/*.js', '!app/**/*.spec.js']))
        .pipe(plugins.angularFilesort())
        .pipe(plugins.if(!production, plugins.sourcemaps.init()))
        .pipe(plugins.ngAnnotate({add: true}))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.if(!production, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(stageLibDir))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Cleans app js files
 */
gulp.task('clean-app-js', function(done) {
    clean(stageLibDir + 'app.min.js', done);
});

/**
 * Process vendor css files
 */
gulp.task('process-vendor-css', ['clean-vendor-css'], function() {
    return gulp
        .src(mainBowerFiles({filter: "**/*.css"}))
        .pipe(plugins.print())
        .pipe(plugins.if(!production, plugins.sourcemaps.init()))
        .pipe(plugins.csso())
        .pipe(plugins.concat('vendor.min.css'))
        .pipe(plugins.if(!production, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(stageStylesDir))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Cleans vendor css files
 */
gulp.task('clean-vendor-css', function(done) {
    clean(stageStylesDir + 'vendor.min.css', done);
});

/**
 * Process vendor image files
 */
gulp.task('process-vendor-images', ['clean-vendor-images'], function() {
    return gulp
        .src(mainBowerFiles({filter: "**/*.svg"}))
        .pipe(plugins.print())
        .pipe(plugins.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(stageDir + 'images/vendor'));
});

/**
 * Cleans vendor images files
 */
gulp.task('clean-vendor-images', function(done) {
    clean(stageDir + 'images/vendor/**/*.*', done);
});

/**
 * Process app css files
 */
gulp.task('process-app-css', ['clean-app-css'], function() {
    return gulp
        .src(srcAppCss)
        .pipe(plugins.sass())
        .pipe(plugins.if(!production, plugins.sourcemaps.init()))
        .pipe(plugins.csso())
        .pipe(plugins.concat('app.min.css'))
        .pipe(plugins.if(!production, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(stageStylesDir))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Cleans app css files
 */
gulp.task('clean-app-css', function(done) {
    clean(stageStylesDir + 'app.min.css', done);
});

/**
 * Process fonts
 */
gulp.task('process-fonts', ['clean-fonts'], function() {
   return gulp
       .src('./bower_components/roboto-fontface/fonts/**/*')
       .pipe(gulp.dest(stageStylesDir + 'fonts'))
       .pipe(browserSync.reload({stream: true}));
});

/**
 * Cleans fonts
 */
gulp.task('clean-fonts', function(done) {
    clean(stageStylesDir + 'fonts', done);
});

/**
 * Process index.html
 */
gulp.task('process-indexhtml', ['clean-indexhtml'], function() {
    return gulp
        .src(srcIndexHtml)
        .pipe(gulp.dest(stageDir))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Clean index.html
 */
gulp.task('clean-indexhtml', function(done) {
    clean(stageDir + 'index.html', done);
});

/**
 * Create $templateCache from the html templates
 */
gulp.task('process-templatecache', ['clean-templatecache'], function() {
    return gulp
        .src(srcHtmlTemplates)
        .pipe(plugins.minifyHtml({empty: true}))
        .pipe(plugins.angularTemplatecache(
            'templates.js',
            {
                module: 'app',
                root: 'app/',
                standAlone: false
            }
        ))
        .pipe(gulp.dest('target/temp/'));
});

/**
 * Clean templatecache
 */
gulp.task('clean-templatecache', function(done) {
    clean('target/temp/templates.js', done);
});

/**
 * Process app images
 */
gulp.task('process-app-images', ['clean-app-images'], function() {
    return gulp
        .src('./src/main/webapp/client/images/**/*.*')
        .pipe(plugins.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(stageDir + 'images/app'))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Cleans app images files
 */
gulp.task('clean-app-images', function(done) {
    clean(stageDir + 'images/app/**/*.*', done);
});

/**
 * Process web.xml
 */
gulp.task('process-webxml', function() {
    return gulp
        .src('./src/main/webapp/WEB-INF/web.xml')
        .pipe(gulp.dest(stageDir + 'WEB-INF/'));
});

/**
 * Watch files for changes
 */
gulp.task('watch',['process-all'], function() {
    gulp.watch('./bower.json', ['process-vendor-js', 'process-vendor-css', 'process-fonts']);
    gulp.watch(srcAppJs, ['process-app-js']);
    gulp.watch(srcAppCss, ['process-app-css']);
    gulp.watch(srcHtmlTemplates, ['process-app-js']);
    gulp.watch(srcIndexHtml, ['process-indexhtml']);
    gulp.watch('./src/main/webapp/client/images/**/*.*', ['process-app-images']);
});

/**
 * Start dev server
 */
gulp.task('dev', ['watch'], function () {
    var proxyOptions = url.parse('http://localhost:8001/api');
    proxyOptions.route = '/api';

    plugins.developServer.listen({
        path: './src/main/webapp/server/app.js',
        execArgv: ['--harmony']
    }, function (error) {
        if (!error)
            browserSync({
                    open: true,
                    port: 3000,
                    server : {
                        baseDir: stageDir,
                        middleware: [proxy(proxyOptions)]
                    }
                }
            );
    });
});

/**
 * Error handler
 * @param err
 */
function onError(err) {
    console.log(err);
    this.emit('end');
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    del(path, done);
}

/**
 * Process all js
 */
gulp.task('process-js', ['process-vendor-js', 'process-app-js']);

/**
 * Process all css
 */
gulp.task('process-css', ['process-vendor-css', 'process-app-css']);

/**
 * Process all images
 */
gulp.task('process-images', ['process-vendor-images', 'process-app-images']);

/**
 * Process all
 */
gulp.task('process-all', ['process-js', 'process-css', 'process-fonts', 'process-indexhtml', 'process-images','process-webxml']);

/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
    var delconfig = [].concat('./target').concat('./bower_components').concat('./node_modules').concat('./node').concat('./etc');
    del(delconfig, done);
});

/**
 * Default task
 */
gulp.task('default', ['process-all']);

gulp.task('build-prod', function(callback) {
    runSequence('clean','process-all',callback);
});
