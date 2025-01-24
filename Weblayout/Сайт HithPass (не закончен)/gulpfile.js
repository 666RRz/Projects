const { src, dest, series, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const browserSync = require("browser-sync").create();
const svgSprite = require("gulp-svg-sprite");
const sourcemaps = require("gulp-sourcemaps");
const htmlMin = require("gulp-htmlmin");
const notify = require("gulp-notify");
const image = require("gulp-image");
const concat = require("gulp-concat");

const clean = () => {
  return del(["app/*"]);
};

//svg sprite
const svgSprites = () => {
  return src("./src/img/svg/**.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", //sprite file name
          },
        },
      })
    )
    .pipe(dest("./app/img"));
};

const styles = () => {
  return src("./src/css/**/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ level: 1 }))
    .pipe(concat("main.css"))
    .pipe(dest("./app/css/"))
    .pipe(browserSync.stream());
};

// const scripts = () => {
//   return src(
//     ['./src/js/components/**.js', './src/js/main.js'])
//     .pipe(sourcemaps.init())
// 		.pipe(babel({
// 			presets: ['@babel/env']
// 		}))
//     .pipe(concat('main.js'))
//     .pipe(uglify().on("error", notify.onError()))
//     .pipe(sourcemaps.write('.'))
//     .pipe(dest('./app/js'))
//     .pipe(browserSync.stream());
// }

const resources = () => {
  return src("./src/resources/**").pipe(dest("./app"));
};

const images = () => {
  return src([
    "./src/img/**.jpg",
    "./src/img/**.png",
    "./src/img/**.jpeg",
    "./src/img/*.svg",
    "./src/img/**/*.jpg",
    "./src/img/**/*.png",
    "./src/img/**/*.jpeg",
  ])
    .pipe(image())
    .pipe(dest("./app/img"));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });

  watch("./src/css/**/*.css", styles);
  watch("./src/*.html", htmlMinify);
  watch("./src/js/**/*.js", scripts);
  watch("./src/resources/**", resources);
  watch("./src/img/*.{jpg,jpeg,png,svg}", images);
  watch("./src/img/**/*.{jpg,jpeg,png}", images);
  watch("./src/img/svg/**.svg", svgSprites);
};

const htmlMinify = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
};

exports.cleanProd = clean;

exports.build = series(
  clean,
  styles,
  resources,
  images,
  svgSprites,
  htmlMinify
);

const cleanDev = () => {
  return del(["dev/*"]);
};

const stylesDev = () => {
  return src("./src/styles/**/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(concat("main.css"))
    .pipe(dest("./dev/css/"))
    .pipe(browserSync.stream());
};

const htmlMinifyDev = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dev"))
    .pipe(browserSync.stream());
};

// const scriptsDev = () => {
//   return src(
//     ['./src/js/components/**.js', './src/js/main.js'])
//     .pipe(concat('main.js'))
//     .pipe(dest('./dev/js'))
//     .pipe(browserSync.stream());
// }

const resourcesDev = () => {
  return src("./src/resources/**").pipe(dest("./dev"));
};

const imagesDev = () => {
  return src([
    "./src/img/**.jpg",
    "./src/img/**.png",
    "./src/img/**.jpeg",
    "./src/img/**.svg",
    "./src/img/**.jpg",
    "./src/img/**.png",
    "./src/img/**.jpeg",
  ])
    .pipe(image())
    .pipe(dest("./dev/img"))
    .pipe(browserSync.stream());
};

const svgSpritesDev = () => {
  return src("./src/img/svg/**.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", //sprite file name
          },
        },
      })
    )
    .pipe(dest("./dev/img"));
};

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: "./dev",
    },
  });

  watch("./src/styles/css/**/*.css", stylesDev);
  watch("./src/*.html", htmlMinifyDev);
  watch("./src/resources/**", resources);
  watch("./src/img/*.{jpg,jpeg,png,svg}", images);
  watch("./src/img/**/*.{jpg,jpeg,png}", images);
  watch("./src/img/svg/**.svg", svgSprites);
};

exports.cleanDev = cleanDev;

exports.dev = series(
  cleanDev,
  stylesDev,
  resourcesDev,
  imagesDev,
  svgSpritesDev,
  htmlMinifyDev,
  watchFilesDev
);
