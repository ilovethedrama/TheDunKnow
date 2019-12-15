const expressSanitizer = require("express-sanitizer"),
  methodOvr = require("method-override"),
  bodyP = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  helmet = require("helmet"),
  port = 3000 || 27017,
  app = express();

mongoose.connect("mongodb://localhost:27017/tdk", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(helmet());
app.use(expressSanitizer());
app.use(methodOvr("_method"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyP.json());
app.use(
  bodyP.urlencoded({
    extended: true
  })
);

app.set("view engine", "ejs");

//////////ROUTES

///***INDEX***///

app.get("/articles", (req, res) => {
  TDKrticle.find({}, (error, ftcArticles) => {
    if (error) {
      console.log(error);
    } else {
      res.render("home", {
        ftcArticles: ftcArticles
      });
    }
  });
});

app.get("/articles/:section/news", (req, res) => {
  var theSection = req.params.section;
  TDKsection.find({
    topic: "Fresh Cuts"
  }, (error, topicArticles) => {
    if (error) {
      console.log(error);
    } else {
      console.log(theSection);
      res.render("sectionIndex", {
        topicArticles: topicArticles
      });
    }
  });
});

app.get("/video", (req, res) => {
  res.render("video_article", {
    root: __dirname
  });
});

///***NEW***///

app.get("/articles/newSection", (req, res) => {
  res.render("newSectionForm");
});

app.get("/articles/newArticle", (req, res) => {
  res.render("newForm");
});

///***SHOW***///

app.get("/articles/:id", (req, res) => {
  TDKrticle.findById(req.params.id, (err, retrievedArticle) => {
    if (err) {
      res.redirect("/articles");
    } else {
      res.render("show", {
        showArticle: retrievedArticle
      });
    }
  });
});

//         theCourtsArticles: theCourtsArticles,
//         freshArticles: freshArticles,
//         classicArticles: classicArticles

// app.get('/articles', (req, res) => {
//   TDKrticle.find({
//     section: 'The Classics'
//   }).then()
// })
// app.get("/articles", (req, res) => {
//   TDKrticle.find({
//     section: 'for the culture'
//   }, (error, ftcArticles) => {
//     if (error) {
//       console.log(error)
//     } else {
//       res.render("home", {

//       });
//     }
//   })
// });

///***CREATE***///

app.post("/articles/:section/news", (req, res) => {
  TDKsection.create(req.body.section, function (err, newSection) {
    if (err) {
      console.log(`Ahh man no new section because :`, err);
      res.render("newSectionForm");
    } else {
      console.log(`Yep new section made. Fresh one too.`, newSection);
      res.redirect("/articles");
    }
  });
});

app.post("/articles", (req, res) => {
  TDKrticle.create(req.body.article, function (err, newArticle) {
    if (err) {
      console.log(`twas not possible to make a new article because: `, err);
      res.render("newForm");
    } else {
      var topic2 = newArticle.topic;
      console.log(`twas indeed possible to make a new article, created it has beeen!. The section of the article falls under ${topic2}`);
      TDKsection.findOne({
        topic: topic2
      }, (err, retrievedSection) => {
        if (err) {
          res.redirect("/articles");
          console.log(`couldnt find the section because: `, err);
        } else {
          retrievedSection.articles.push(topic2);
          console.log("the retrieved Section is :" + retrievedSection[0]);
          res.redirect("/articles");
        }
      });
    }
  });
});

// app.get("/:section/feature/:artist/interview", (req, res) => {
//   res.render("interview", {
//     root: __dirname
//   });
// });

app.get("*", (req, res) => {
  res.render("404", {
    root: __dirname
  });
});

var articleSchema = new mongoose.Schema({
  title: String,
  created: {
    type: Date,
    default: Date.now
  },
  author: String,
  image: {
    heroImage: {
      imageTitle: String,
      imagePath: String,
      imageAltText: String
    },
    leftSmallIntroImage: {
      imageTitle: String,
      imagePath: String,
      imageAltText: String
    },
    rightMedIntroImage: {
      imageTitle: String,
      imagePath: String,
      imageAltText: String
    },
    topTextImage: {
      imageTitle: String,
      imagePath: String,
      imageAltText: String
    },
    bottomTextImage: {
      imageTitle: String,
      imagePath: String,
      imageAltText: String
    }
  },
  articleSlug: String,
  text: {
    paragraph1: String,
    paragraph2: String,
    paragraph3: String,
    paragraph4: String
  },
  section: String,
  topic: ["The Courts", "Fresh Cuts", "The Classics", "For The Culture"]
});

var TDKrticle = mongoose.model("TDKrticle", articleSchema);

var sectionSchema = new mongoose.Schema({
  title: String,
  image: {
    heroImage: {
      imageTitle: String,
      imagePath: String,
      imageAltText: String
    }
  },
  tagline: String,
  topic: String,
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: articleSchema
  }]
  //embedded data needs to be defined first or at least above the schema that uses it
});

var TDKsection = mongoose.model("TDKsection", sectionSchema);

// var sectionInstance = new TDKsection({
//   title: req.body.title,
//   image: req.body.image,
//   tagline: req.body.tagline,
//   topic: req.body.topic,
//   articles: req.body.articles
// });

var sectionInstance = new TDKsection({
  title: "Yolo Mag",
  tagline: "If you feel it shout logogogo",
  topic: "The Classics"
});

// sectionInstance.save((err, egg) => {
// if(err){
//   console.log('errrrr');
// } else {
//   console.log(egg);
// }
// })

var articleInstance = new TDKrticle({
  title: "Burrito Baby",
  author: "Twisty Stomach",
  articleSlug: "New beginning in your tummy",
  topic: "The Classics"
});



// sectionInstance.save((err, egg) => {
//   if (err) {
//     console.log("errrrr");
//   } else {
//     console.log(egg);
//   }
// });

app.listen(port, () => {
  console.log(`it's a lituation!!!, lets go`, port);
});