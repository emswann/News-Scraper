const cheerio = require("cheerio");
const request = require("request");
const db      = require("../models");

module.exports = app => {

  app.get("/", (req, res) => {
    request("http://www.nytimes.com", (error, response, html) => {
      const $ = cheerio.load(html);

      var results = [];
      $("article.theme-summary", "div.a-column").each((i, element) => {
        const title   = $(element).children("h2.story-heading").children("a").text().trim();
        const link    = $(element).children("h2.story-heading").children("a").attr("href").trim();
        const summary = $(element).children("p.summary").text().trim();
        const byline  = $(element).children("p.byline").text().trim();
        results.push({ title: title,
                       byline: byline,
                       summary: summary,
                       link: link} );
      })

      $("article.theme-summary", "div.b-column").each((i, element) => {
        const title   = $(element).children("h2.story-heading").children("a").text().trim();
        const link    = $(element).children("h2.story-heading").children("a").attr("href").trim();
        const summary = $(element).children("p.summary").text().trim();
        const byline  = $(element).children("p.byline").text().trim();
        results.push({ title: title,
                       byline: byline,
                       summary: summary,
                       link: link} );
      })
      res.json(results);
    });

  });

};
