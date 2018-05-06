var mongoose = require("mongoose");
// Schema constructor
var Schema = mongoose.Schema;

// Rules schema for scraped articles
var ArticleSchema = new Schema({
  // Title is required string
  title: {
    type: String,
    required: true,
    unique: true
  },
  // Link is required and unique
  link: {
    type: String,
    required: true,
    unique: true
  },
  // articleSnippet is required and unique
  articleSnippet: {
    type: String,
    required: true,
    unique: true
  },
  // Property of the article schema which saves all the comments using the comments model
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// Article schema creates article model
var Article = mongoose.model("Article", ArticleSchema);

// Exports article model
module.exports = Article;
