const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');

sass.compiler = require('node-sass');

const paths = {
  css: {
    src: './src/css/*.scss',
    dest: './public/css/'
  },
  js:{
    src: './src/js/*.js',
    dest: './public/js/'
  }
}

function styles(){
  return gulp.src(paths.css.src)
  .pipe(postcss([tailwindcss('tailwind.config.js')]))
  .pipe(sass().on('error',sass.logError))
  .pipe(gulp.dest(paths.css.dest));
}

exports.styles = styles;
