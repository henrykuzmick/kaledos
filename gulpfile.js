var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    handlebars   = require('gulp-compile-handlebars'),
    rename       = require('gulp-rename'),
    connect      = require('gulp-connect'),
    jeditor      = require('gulp-json-editor'),
    concat       = require('gulp-concat'),
    concatCss    = require('gulp-concat-css'),
    uglify       = require('gulp-uglify'),
    uglify       = require('gulp-minify'),
    seneliai     = require('./seneliai.json');


var jsFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/angular/angular.js',
  'app.js',
  'snow.js'
];
var cssFiles = [
  'node_modules/normalize.css/normalize.css',
];


gulp.task('sass', function() {
  return gulp.src('sass/main.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({browsers: ['last 2 versions', '> 1%', 'IE 7', 'IE 8', 'IE 9', 'IE 10', 'Firefox < 20', 'Firefox >= 20']}))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src(cssFiles)
    .pipe(concatCss("vendor.css"))
    .pipe(gulp.dest('css'));
});

gulp.task('js', function(){
  return gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(uglify({mangle:true}))
    .pipe(gulp.dest('js'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
  gulp.watch('sass/**/*.sass', ['sass']);
  gulp.watch('senelis.handlebars', ['handlebars']);
  gulp.watch('app.js', ['js']);
});

gulp.task('connect', function() {
  connect.server({
    root: ["./"],
    livereload: true
  });
});

gulp.task('makejson', function(){
  var spalvos = ["#e43f5e", "#0999d9", "#443083", "#00b48c", "#101010"];
  var daiktai = 3;
  var transportas = 4;
  var lytis = 2;
  var seneliai = [];
  for(var a = 0; a < spalvos.length; a++) {
    for(var b = 0; b < daiktai; b++) {
      for(var c = 0; c < transportas; c++) {
        for(var d = 0; d < lytis; d++) {
          var senelis = {
            pavadinimas: (a+1) + '' + (b+1) + '' + (c+1) + '' + (d+1),
            foto: (b+1) + '' + (c+1) + '' + (d+1) + ".png",
            spalva: spalvos[a]
          };
          seneliai.push(senelis);
        }
      }
    }
  }
  console.log(seneliai);
  gulp.src("./seneliai.json")
    .pipe(jeditor(function(json) {
      json = seneliai;
      return json; // must return JSON object.
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('handlebars', function() {
  for(var i = 0; i < seneliai.length; i++) {
    var senelis = seneliai[i];
    var fileName = "senelis-" + senelis.pavadinimas;
    gulp.src('senelis.handlebars')
      .pipe(handlebars(senelis))
      .pipe(rename(fileName + ".html"))
      .pipe(gulp.dest('seneliai'));
  }
});

gulp.task('default', ['sass', 'watch', 'connect', 'handlebars', 'js', 'css']);
