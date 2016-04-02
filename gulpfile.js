var gulp          = require('gulp');
var babel         = require('gulp-babel');
var clean         = require('gulp-clean');
var concat        = require('gulp-concat');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var inject        = require('gulp-inject');
var htmlmin       = require('gulp-htmlmin');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync').create();
var templateCache = require('gulp-angular-templatecache');

var app = {
  module : 'wmi',
  dist   : './dist',
  index  : './src/index.html',
  icons  : './src/*.{ico,png}',
  json   : './src/json/**/*.json',
  html   : [
    './src/html/**/*.html',
    './src/components/**/*.html'
  ],
  fonts  : [
    './src/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    './src/components/**/*.{eot,svg,ttf,woff,woff2}'
  ],
  // mandatory array order, see app:css task
  css    : [
    './src/scss/styles.scss',
    './src/components/**/*.scss',
    './src/scss/**/*.scss'
  ],
  img    : [
    './src/img/**/*.{gif,jpg,jpeg,png,svg}',
    './src/components/**/*.{gif,jpg,jpeg,png,svg}'
  ],
  js     : [
    './src/app.js',
    './src/js/**/*.js',
    './src/components/**/*.js'
  ]
};

var vendor = {
  fonts: [
    './bower_components/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}'
  ],
  css: [
    './bower_components/bootstrap/dist/css/bootstrap.min.css'
  ],
  js: [
    './bower_components/angular/angular.min.js',
    './bower_components/angular-route/angular-route.min.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './bower_components/angular-sanitize/angular-sanitize.min.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './bower_components/moment/min/moment.min.js',
    './bower_components/lodash/dist/lodash.min.js'
  ]
};

// UTILITIES
gulp.task('clean', function() {
  return gulp.src(app.dist, {read:false})
    .pipe(clean());
});

gulp.task('browserSync', function() {
  return browserSync.init({
    server: {
      baseDir: app.dist
    }
  });
});

gulp.task('reload', function() {
  return browserSync.reload();
});

// VENDOR FONTS TASKS
gulp.task('vendor:fonts', function() {
  return gulp.src(vendor.fonts)
    .pipe(gulp.dest(app.dist + '/fonts'));
});

// VENDOR CSS TASKS
gulp.task('vendor:css', function() {
  return gulp.src(vendor.css)
    .pipe(concat('vendor.min.css'))
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(app.dist + '/css'));
});

// VENDOR JS TASKS
gulp.task('vendor:js', function() {
  return gulp.src(vendor.js)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(app.dist + '/js'));
});

// APP FONTS TASKS
gulp.task('app:fonts', function() {
  return gulp.src(app.fonts)
    .pipe(gulp.dest(app.dist + '/fonts'));
});

// APP ICONS TASKS
gulp.task('app:icons', function() {
  return gulp.src(app.icons)
    .pipe(gulp.dest(app.dist));
});

// APP JSON TASKS
gulp.task('app:json', function() {
  return gulp.src(app.json)
    .pipe(gulp.dest(app.dist + '/json'));
});

// APP CSS TASKS
gulp.task('app:css', function() {

  // use styles.scss to determine order
  var sortedStream = [
    app.css[0],
    app.css[1]
  ];

  return gulp.src(sortedStream)
    .pipe(concat('app.min.css'))
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(app.dist + '/css'));
});

// APP JS TASKS
gulp.task('app:js', function() {
  return gulp.src(app.js)
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(app.dist + '/js'));
});

// APP IMAGE TASKS
gulp.task('app:img', function() {
  return gulp.src(app.img)
    .pipe(gulp.dest(app.dist + '/img'));
});

// APP HTML TASKS
gulp.task('app:html', function() {
  return gulp.src(app.html)
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(templateCache('templates.min.js', {module:app.module}))
    .pipe(uglify())
    .pipe(gulp.dest(app.dist + '/js'));
});

// APP GLOBAL CSS
gulp.task('app:global:css', function() {
  var sortedStream = [
    app.dist + '/**/vendor*.css',
    app.dist + '/**/app*.css'
  ];

  return gulp.src(sortedStream)
    .pipe(concat(app.module + '.min.css'))
    .pipe(gulp.dest(app.dist + '/css'));
});

// APP GLOBAL JS
gulp.task('app:global:js', function() {
  var sortedStream = [
    app.dist + '/**/vendor*.js',
    app.dist + '/**/app*.js',
    app.dist + '/**/templates*.js'
  ];

  return gulp.src(sortedStream)
    .pipe(concat(app.module + '.min.js'))
    .pipe(gulp.dest(app.dist + '/js'));
});

// APP INDEX INJECTION
gulp.task('app:index', function() {
  var stream        = app.dist + '/**/' + app.module + '*.{css,js}';
  var filesInject   = gulp.src(stream, {read:false});
  var injectOptions = {
    ignorePath   : '/dist/',
    addRootSlash : false
  };
 
  return gulp.src(app.index)
    .pipe(inject(filesInject, injectOptions))
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest(app.dist));
});

// APP WATCH TASKS
gulp.task('watch', function() {
  gulp.watch(app.fonts).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:fonts','reload');
  });
  gulp.watch(app.icons).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:icons','reload');
  });
  gulp.watch(app.json).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:json','reload');
  });
  gulp.watch(app.css).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:css','app:global:css','reload');
  });
  gulp.watch(app.js).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:js','app:global:js','reload');
  });
  gulp.watch(app.img).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:img','reload');
  });
  gulp.watch(app.html).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:html','app:global:js','reload');
  });
  gulp.watch(app.index).on('change', function(event) {
    console.log(event.path + ' was ' + event.type);
    runSequence('app:index','reload');
  });
});

// BUILD TASKS
gulp.task('build', function(cb) {
  runSequence('clean',['vendor:fonts','vendor:css','vendor:js'],['app:fonts','app:icons','app:json','app:css','app:js','app:img','app:html'],['app:global:css','app:global:js'],'app:index',cb);
});

gulp.task('serve', function(cb) {
  runSequence('build','browserSync','watch',cb);
});

gulp.task('default',['build']);