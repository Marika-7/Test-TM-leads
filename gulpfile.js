const { src, dest, watch, parallel, series } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
// const svgSprite = require('gulp-svg-sprite');
 
const build_folder = 'docs';

function html() {
  return src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest(build_folder));
}

function styles() {
  return src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError)) // for css (without min)
    // .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)) // for min.css
    .pipe(autoprefixer())
    // .pipe(concat('main.min.css'))
    .pipe(dest(build_folder + '/styles'));
}

function scripts() {
  return src('src/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    // .pipe(uglify()) // for min.js
    // .pipe(concat('main.min.js'))
    .pipe(concat('main.js'))
    .pipe(dest(build_folder + '/scripts'));
}

function server() {
  browserSync.init({
    server: {
      baseDir: './' + build_folder
    },
    notify: false
  });
  browserSync.watch(build_folder, browserSync.reload);
}

function deleteBuild(cb) {
  return src([
    build_folder + '/**/*.*', 
    '!' + build_folder + '/fonts/*.*',
    '!' + build_folder + '/images/*.*',
    '!' + build_folder + '/robots.txt',
    '!' + build_folder + '/favicon.png',
    // '!docs/css/main.css',
    // '!docs/js/main.js',
  ])
    .pipe(clean());
}

function watching() {
  watch('src/pug/**/*.pug', html);
  watch('src/styles/**/*.scss', styles);
  watch('src/scripts/**/*.js', scripts);
  // watch('src/images/*.*', images);
}

// function sprite() {
//   return src('src/images/icons/*.svg')
//     .pipe(svgSprite({
//       // dest: build_folder + '/images',
//       shape: {
//         dimension: {
//           precision: 2,
//         },
//       },
//       mode: {
//         symbol: true,
//         // view: true,
//         // sprite: 'sprite.svg'
//       }
//     }))
//     .pipe(dest('src/images/icons'));
// }

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
// exports.sprite = sprite;

exports.default = series(
  deleteBuild,
  parallel(html, styles, scripts),
  parallel(watching, server)
);
