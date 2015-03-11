var gulp = require('gulp');
var gutil = require('gulp-load-utils')(['log']);
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp-*-*','gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
var log = gutil.log;
var dest = 'client/app/';

/**
 * Include bower main js files only
 * @return {Stream}
 */

gulp.task("bower_js",function(){
    log('Fetching Bower js files');

    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        //.pipe(/* doing something with the JS scripts */)
        .pipe(gulp.dest(dest + 'js'));
})

/**
 * Include bower main css files only
 * @return {Stream}
 */

gulp.task("bower_css",function(){

    log('Fetching Bower css files');

    return gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.css'))
        //.pipe(/* doing something with the JS scripts */)
        .pipe(gulp.dest(dest + 'css'));
})


/**
 * Minify and concat css files only
 * @return {Stream}
 */



gulp.task('min-concat', function() {
    return gulp.src(dest)
        .pipe(uglify())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(dest+ 'css'));
});


/**
 * Compile Sass to CSS
 * @return {Stream}
 */
gulp.task('styles', function() {
    log('Compiling Sass --> CSS');

    return gulp
        .src('client/app/*.scss')
        .pipe(plugins.sass())
        //.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(dest +'css'));
});

/**
 * Inject js and css file to index.html
 * @return {Stream}
 */

gulp.task('index', function () {
    log("Injecting js and css to index.html");
    log(__dirname);
   return gulp.src(dest+'index.html')
        .pipe(plugins.inject(gulp.src([dest+'js/*.js',dest+'css/*.css'], {read: false, addRootSlash: false})
        .pipe(plugins.angularFilesort())), {ignorePath: 'clients/app', relative: true})
        .pipe(gulp.dest(dest));

});


gulp.task('default', ['bower_js','styles','bower_css',], function() {

});