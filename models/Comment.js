var mongoose = require("mongoose");
// Schema object constructor
var Schema = mongoose.Schema;

// Comment schema
var CommentSchema = new Schema({
  // Required string NAME
  name: {
    type: String,
    required: true
  },
  // Required string BODY
  body: {
    type: String,
    required: true
  }
});

// Comment model created with CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export Comment model
module.exports = Comment;
