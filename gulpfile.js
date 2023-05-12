const sass = require('gulp-sass')(require('sass'));
const { src, dest, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixers = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const fontfacegen = require('gulp-fontfacegen');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
// import image from 'gulp-imagemin';

const clean = () => {
    return del(['dist']);
};

const stylesBuild = () => {
    return src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixers({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
};
const styles = () => {
    return src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
};

const font = () => {
return src("src/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}")
.pipe(dest("dist/fonts"))
};



const htmlMinifyBuild = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
};
const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
};

const svgSprites = () => {
    return src('src/img/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/img'))
};

const scriptsBuild = () => {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('index.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
};
const scripts = () => {
    return src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
};

const images = () => {
    return src([
        'src/img/**/*jpg',
        'src/img/**/*png',
        'src/img/*svg',
        'src/img/**/*jpeg',
    ])
        .pipe(image())
        .pipe(dest('dist/img'))
};

watch('src/**/*.html', htmlMinify);
watch('src/sass/**/*.scss', styles);
watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);


exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.default = series(clean, htmlMinify, scripts, styles, font, svgSprites, images, watchFiles);
exports.build = parallel(clean, htmlMinifyBuild, scriptsBuild, font, stylesBuild, svgSprites, images);
