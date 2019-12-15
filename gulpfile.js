"use strict";

const browserSync = require("browser-sync").create(),
  autoPrefixer = require("gulp-autoprefixer"),
  uglifycss = require("gulp-uglifycss"),
  plumber = require("gulp-plumber"),
  nodemon = require("gulp-nodemon"),
  minify = require("gulp-minify"),
  notify = require("gulp-notify"),
  sass = require("gulp-sass"),
  gulp = require("gulp");

const scssToCss = () => {
  return gulp
    .src("public/CSS/TDKstyle.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest("public/CSS"))
    .pipe(
      browserSync.stream({
        match: "**/*.css"
      })
    );
};
scssToCss.description =
  "changes scss to css and adds autoprefixes for browser support";

const distill = () => {
  return gulp
    .src("public/CSS/theDunKnow.css")
    .pipe(
      uglifycss({
        uglyComments: true
      })
    )
    .pipe(gulp.dest("public/CSS"));
};

let thePausinator;

const holdIt = done => {
  thePausinator = setTimeout(bSync, 3000);
  done();
};

const bSync = () => {
  browserSync.init({
    proxy: "localhost:3000",
    port: 3003,
    online: true
  });
};

const smallerJS = done => {
  gulp
    .src("public/JS/theDunKnow.js")
    .pipe(minify())
    .pipe(gulp.dest("public/JS/"));
  done();
};

smallerJS.description = "minifies your JS file";

bSync.description = "allows for live browser view of file as changes are made";

var watcher = done => {
  gulp.watch("public/CSS/*.scss").on("change", scssToCss);
  gulp.watch("public/views/**/*.ejs").on("change", browserSync.reload);
  done();
};
watcher.description =
  "watches both the ejs and scss files and triggers a browser reload or css injection";

const server = function (done) {
  nodemon({
    script: "app.js",
    // this listens to changes in any of these files/routes and restarts the application
    // watch: ["app.js", "public/views/partials/*.ejs", '/public/CSS/*.scss'],
    watch: ["app.js", "public/**/*.+(mp4|jpeg|html|scss)"],
    ext: "js"
  }).on("restart", () => {
    gulp
      .src("app.js")
    // .pipe(notify("restarting the server file now"));
  });
  done();
};

/*This starts the server and also browserSync and then watches for 
changes to the scss files and ejs files and updates the browser if
 either one changes and also injects css when scss is ListeningStateChangedEvent. SICCKKK */
gulp.task(
  "default",
  gulp.parallel(server, holdIt, gulp.parallel(gulp.series(scssToCss), watcher))
);

gulp.task("squeezeJSnCSS", gulp.series(smallerJS, distill));