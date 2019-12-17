var mongoose = require("mongoose");

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
  
//   var TDKrticle = mongoose.model("TDKrticle", articleSchema);
  module.exports = mongoose.model("TDKrticle", articleSchema);

//   var articleInstance = new TDKrticle({
//     title: "Burrito Baby",
//     author: "Twisty Stomach",
//     articleSlug: "New beginning in your tummy",
//     topic: "The Classics"
//   });