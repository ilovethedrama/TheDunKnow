var mongoose = require("mongoose"),
    articleSchema = require("./articles").schema;

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
    articles: [articleSchema]
    //embedded data needs to be defined first or at least above the schema that uses it
});

var TDKsection = mongoose.model("TDKsection", sectionSchema);


module.exports = mongoose.model("TDKsection", sectionSchema);

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





// sectionInstance.save((err, egg) => {
//   if (err) {
//     console.log("errrrr");
//   } else {
//     console.log(egg);
//   }
// });