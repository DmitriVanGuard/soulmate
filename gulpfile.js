const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    $ = require('gulp-load-plugins')();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const moduleJS  = [
  'app/js/main.js'
];
const paths = {
  pug : {
    src : 'app/pug/_pages/*.pug',
    all : 'app/pug/**/*.pug',
    distDev : 'distDev'
  },
  js : {
    distDev : 'distDev/js',
    all : 'app/js/**/*.js'
  },
  css : {
    main : 'app/css/main.scss',
    all : 'app/css/**/*.scss',
    distDev : 'distDev/css/'
  },
  php : {
    all : 'app/php/**/*.php',
    distDev : 'distDev'
  },
  images : {
    all : 'app/img/**/*.{png,jpg}',
    svg : 'app/img/icons/*.svg',
    distDev : 'distDev/img'
  },
  browser : {
    server : 'distDev/',
    proxy : 'localhost/soulmate/distDev'
  },
  fonts : {
    all : 'app/css/fonts/**/*.{woff2,woff,ttf,eot}', //{woff2, woff, ttf, eot}
    distDev : 'distDev/css/fonts'
  }
};

// RUN SERVER 
gulp.task('serve', function() {
  browserSync.init({
      proxy: paths.browser.proxy // DOMAIN NAME
      // server: paths.browser.server
  });

  browserSync.watch('distDev/**/*.*').on('change', browserSync.reload);
});

// Преобразоване pug to HTML
gulp.task('build:pug', function() {
    return gulp.src(paths.pug.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError(function (err) {
          return {title: 'pug', message: err.message}
        })
      }))
      .pipe($.pug({
        pretty: '\t' // отступы в 1 таб
      }))
      .pipe(gulp.dest(paths.pug.distDev));
});

// перенос и оптимизация картинок
gulp.task('images', function(){
  return gulp.src(paths.images.all) // *.+(svg|png|jpg)
  .pipe($.if('*.{png,jpg}', $.cache($.imagemin({optimizationLevel: 3,
                              progressive: true, 
                              interlaced: true
                            }
                          )
                )))
  .pipe(gulp.dest(paths.images.distDev));
});

//Перенос fonts
gulp.task('fonts', function(){
  return gulp.src(paths.fonts.all)
    .pipe(gulp.dest(paths.fonts.distDev));
});

//Перенос РНР
gulp.task('php', function(){
  return gulp.src(paths.php.all)
    .pipe(gulp.dest(paths.php.distDev));
});

// Scripts JS
gulp.task('build:js', function() {
  return gulp.src(moduleJS)
    .pipe($.plumber({
      errorHandler: $.notify.onError(function (err) {
        return {title: 'javaScript', message: err.message}
      })
    }))
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
    .pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe($.if(isDevelopment, $.sourcemaps.write('maps')))
    .pipe(gulp.dest(paths.js.distDev))
});

gulp.task('styles', function() {
  return gulp.src(paths.css.main)
    .pipe($.plumber({
        errorHandler: $.notify.onError(function(err){
                return {
                  title: "Styles",
                  message: err.message
                };
              })
        }))
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
    .pipe($.sassGlob())
    .pipe($.sass())
    .pipe($.groupCssMediaQueries())
    .pipe($.if(isDevelopment, $.sourcemaps.write()))
    .pipe($.pleeease({
      "sass": true,
      "autoprefixer": true,
      "opacity": true
    }))
    .pipe($.rename('main.min.css'))
    .pipe(gulp.dest(paths.css.distDev));
});


gulp.task('watch', function() {
  gulp.watch(paths.css.all, gulp.series('styles'));
  gulp.watch(paths.js.all, gulp.series('build:js'));
  gulp.watch('app/img/**/*.*', gulp.series('images'));
  gulp.watch(paths.pug.all, gulp.series('build:pug'));
  gulp.watch(paths.php.all, gulp.series('php'));

  // gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('build:svg', function () {
  return gulp.src(paths.images.svg)
  // минифицируем svg
    .pipe($.svgmin({
        js2svg: {
          pretty: true
        }
  }))
  // удалить все атрибуты fill, style and stroke в фигурах
    .pipe($.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
          $('[fill-rule]').removeAttr('fill-rule');
          $('[clip-rule]').removeAttr('clip-rule');
        },
        parserOptions: {
          xmlMode: true
        }
  }))
  // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
    .pipe($.replace('&gt;', '>'))
  // build svg sprite
    .pipe($.svgSprite({
        mode: {
          symbol: {
            sprite: "../icons/sprite.svg",
            /*example: {
              dest: '../tmp/spriteSvgDemo.html' // демо html
            }*/
          }
        }
  }))
    .pipe(gulp.dest(paths.images.distDev));
});

gulp.task('clean', function() {
  return del('distDev');
});

gulp.task('build', gulp.series(
    'clean',
    /*'fonts',*/
    gulp.parallel('php', 'styles', 'images', /*'build:pug', 'build:svg'*/ 'build:js'))
);

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);