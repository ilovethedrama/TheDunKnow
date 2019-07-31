const expressSanitizer = require('express-sanitizer'),
    methodOvr = require('method-override'),
    bodyP = require("body-parser"),
    mongoose = require('mongoose'),
    express = require("express"),
    helmet = require('helmet'),
    port = 3000 || 27017,

    app = express();


mongoose.connect('mongodb://localhost/tdk', {
    useNewUrlParser: true
});

app.use(helmet())
app.use(expressSanitizer());
app.use(methodOvr('_method'));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyP.json());
app.use(
    bodyP.urlencoded({
        extended: true
    })
);

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("home", {
        root: __dirname
    });
});

app.get("/video", (req, res) => {
    res.render("video_article", {
        root: __dirname
    });
});

app.get("/:section/feature", (req, res) => {
    res.render("feature_article", {
        root: __dirname
    });
});

app.get("/:section/feature/:artist/interview", (req, res) => {
    res.render("interview", {
        root: __dirname
    });
});

app.get("/a", (req, res) => {
    res.sendFile("views/theDunKnowStandard.html", {
        root: __dirname
    });
});


app.get("*", (req, res) => {
    res.render("404", {
        root: __dirname
    });
});



app.listen(port, () => {
    console.log(`it's a lituation!!!, lets go`, port);
});