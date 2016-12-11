var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    handlebars   = require('gulp-compile-handlebars'),
    rename       = require('gulp-rename'),
    connect      = require('gulp-connect'),
    jeditor      = require('gulp-json-editor'),
    seneliai     = require('./seneliai.json');





gulp.task('sass', function() {
  return gulp.src('sass/main.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({browsers: ['last 2 versions', '> 1%', 'IE 7', 'IE 8', 'IE 9', 'IE 10', 'Firefox < 20', 'Firefox >= 20']}))
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
  gulp.watch('sass/**/*.sass', ['sass']);
  gulp.watch('senelis.handlebars', ['handlebars']);
});

gulp.task('connect', function() {
  connect.server({
    root: ["./"],
    livereload: true
  });
});

gulp.task('makejson', function(){
  var spalvos = ["#e43f5e", "#0999d9", "#f5ac1e", "#00b48c", "#101010"];
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
            spalva: spalvos[a]
          };
          seneliai.push(senelis);
        }
      }
    }
  }
  console.log(seneliai);
  gulp.src("./s.json")
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

gulp.task('default', ['sass', 'watch', 'connect', 'handlebars']);
