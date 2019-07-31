"use strict";

const gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoPrefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    // servz = require('gulp-webserver'),
    plumber = require("gulp-plumber"),
    nodemon = require('gulp-nodemon');

var test = async () => {
    console.log(
        `
    sup 
    sup 
    sup
    `
    );
};
test.description = "test to make sure gulp works";

var server = {
    host: 'localhost',
    port: '3000'
}



var scssToCss = () => {
    return gulp
        .src("./public/CSS/TDKstyle.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(gulp.dest("./public/CSS/theDunKnow.css"))
        .pipe(
            browserSync.stream({
                match: "**/*.css"
            })
        );
};

scssToCss.description =
    "changes scss to css and adds autoprefixes for browser support";

var bSync = done => {
    browserSync.init({
        server: {
            baseDir: "app.js"
        },
        port: 3000
    });
    done();
};

bSync.description = "allows for live browser view of file as changes are made";

var watcher = () => {
    gulp.watch("./public/CSS/TDKstyle.scss").on("change", scssToCss);
    gulp.watch("views/*.ejs").on("change", browserSync.reload);
};

var server1 = (function () {
    gulp.src('./') // <-- your app folder
        .pipe(servz({
            livereload: true,
            open: true,
            port: 3000 // set a port to avoid conflicts with other local apps
        }));
});

var nodem = async () => {
    return nodemon({
        script: './app.js'
    }).on('start', function () {
        console.log('restarted');
    })
}



// gulp.task('default', gulp.series(nodem));

// this runs fine 
gulp.task('sling', gulp.parallel(watcher));

// gulp.task('sling', gulp.parallel(bSync, watcher));
// this also runs fine, but the server needs to start before sling but also run alongside it at the same time

// gulp.task("default", gulp.series(nodem), gulp.parallel(bSync, watcher));
// gulp.task('default', gulp.parallel(bSync, watcher), gulp.series(test, scssToCss));