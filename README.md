# The Drudge Report Mega Mongo News Scraper
Full stack web application that scrapes the Drudge Report website using a handful of npm packages, most notably cheerio and mongoose. 

* Whether run locally via node server.js or the Heroku app link the most recent Drudge Report news stories are scraped and delivered to the users webpage.

* Users can add comments to stories and when they realize that what they said was probably wrong or offensive, they can delete those comments.
```
Live Heroku link: https://.herokuapp.com/
```
### User Requirement

* Node.js

### Primary technologies used

* node.js
* Express.js
* mongoose
* cheerio

### Getting Started
Clone repo to local machine and run npm i to install dependencies OR just run via Heroku link.  Required dependencies installed via npm i include the list below plus a plethora or other dependencies that support the main NPM's highlighted below.

* express
* express-handlebars
* body-parser
* cheerio
* mongoose
* morgan
* request

Type `npm install` in the command line to install all the dependcies located within package.json

## How to run scraper

 CD into root of cloned directory and run `node server.js` and open your preferred browser to the port specified by the node server.js response (localhost:4000)

`localhost:port/scrape` will scrape the Drudge Report website

`localhost:port/articles` will display the scraped articles

### Author
Jonathan Brown, CFA https://github.com/JonathanBrownCFA
