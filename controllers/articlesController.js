var request = require("request");
// Scraping with Cheerio
var cheerio = require("cheerio");
// Models for Articles and Comments
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

module.exports = function (app) {

  app
    .get('/', function (req, res) {
      res.redirect('/articles');
    });

  app.get("/scrape", function (req, res) {
    //Grabbing the body, or HTML of the Drudge Report
    request("http://www.drudgereport.com/", function (error, response, html) {
      //Save HTML to $ using the Cheerio NPM package
      var $ = cheerio.load(html);
      // Iterate through articles
      $(".post-excerpt").each(function (i, element) {

        var title = $(this)
          .children("h2")
          .children("a")
          .text();
        var link = $(this)
          .children("h2")
          .children("a")
          .attr("href");
        var articleSnippet = $(this)
          .children("div.text")
          .text();

        if (title && link && articleSnippet) {
          // Save an empty result object
          var result = {};

          // Text and href of every link, saved as properties of the resulting object
          result.title = title;
          result.link = link;
          result.articleSnippet = articleSnippet;

          // New entry created with articles model
          Article.create(result, function (err, doc) {
            // Log errors
            if (err) {
              console.log(err
              );
            } else {
              console.log(doc);
            }
          });
        }
      });
    });
    // Send message to the browser that we are finished scraping the page
    res.redirect("/");
  });

  // Retrieve scraped articles from Mongo
  app.get("/articles", function (req, res) {
    // Grab docs from articles array
    Article
      .find({}, function (error, doc) {
        // Log errors
        if (error) {
          console.log(error
          );
        } else {
          res.render("index", {result: doc});
        }
        //Sort articles in descending order
      })
      .sort({'_id': -1});
  });

  // Grab article by it's ObjectId
  app.get("/articles/:id", function (req, res) {
    // Query the finds articles in DB that match ID
    Article.findOne({"_id": req.params.id})
    // Include comments if any
      .populate("comment")
    // Execute query
      .exec(function (error, doc) {
        // Log errors
        if (error) {
          console.log(error
          );
        } else {
          res.render("comments", {result: doc});
         
        }
      });
  });

  // Create new comment
  app.post("/articles/:id", function (req, res) {
    // Create a new Comment and pass the req.body to the entry
    Comment
      .create(req.body, function (error, doc) {
        // Log errors
        if (error) {
          console.log(error
          );
        } else {
          // Use the article id to find and update it's comment
          Article.findOneAndUpdate({
            "_id": req.params.id
          }, {
            $push: {
              "comment": doc._id
            }
          }, {
            safe: true,
            upsert: true,
            new: true
          })
          // Execute query
            .exec(function (err, doc) {
              // Log errors
              if (err) {
                console.log(err);
              } else {
                // Send doc to browser
                res.redirect('back');
              }
            });
        }
      });
  });

  app.delete("/articles/:id/:commentid", function (req, res) {
    Comment
      .findByIdAndRemove(req.params.commentid, function (error, doc) {
        // Log errors
        if (error) {
          console.log(error
          );
        } else {
          console.log(doc);
          Article.findOneAndUpdate({
            "_id": req.params.id
          }, {
            $pull: {
              "comment": doc._id
            }
          })
          // Execute the above query
            .exec(function (err, doc) {
              // Log errors
              if (err) {
                console.log(err);
              }
            });
        }
      });
  });

};