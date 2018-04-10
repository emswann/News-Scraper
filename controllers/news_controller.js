const cheerio = require("cheerio");
const request = require("request");
const db      = require("../models");

const getHeadline = selector => { 
  return {
    link:    selector.children("h2.story-heading").children("a").attr("href"),
    title:   selector.children("h2.story-heading").children("a").text(),
    summary: selector.children("p.summary").text(),
    byline:  selector.children("p.byline").text()
  }
};

const addHeadline = headline => 
  new Promise((resolve, reject) => {
    const query = { link: headline.link.trim(), title: headline.title.trim() };
    const update = headline;
    const options = { upsert: true, 
                      new: true, 
                      setDefaultsOnInsert: true, 
                      runValidators: true };

    db.News.findOneAndUpdate(query, update, options, (error, result) => 
      error ? reject(error) : resolve(result));
  });

const addHeadlines = headlines => 
  Promise.all(headlines.map(headline => addHeadline(headline)));

const renderHeadlines = (req, res, saved, full=false) => {
  db.News.find({saved: saved})
  .then(results => {
    var renderObj = { headlines: results };
    if (!full) renderObj.layout = false;
    var renderFile = saved ? "saved" : "index";

    res.render(renderFile, renderObj);
  });
};

module.exports = app => {
  app.get("/", (req, res) => renderHeadlines(req, res, false, true));

  app.get("/api/home", (req, res) => renderHeadlines(req, res, false)); 

  app.get("/api/saved", (req, res) => renderHeadlines(req, res, true));

  app.get("/api/scrape", (req, res) => {
    // need to count articles.
    request("http://www.nytimes.com", (error, response, html) => {
      const $ = cheerio.load(html);

      var headlines = [];
      $("article.theme-summary", "div.a-column").each((i, element) => {
        const headline = getHeadline($(element));
        if (headline.title && headline.link) headlines.push(headline);
      })

      $("article.theme-summary", "div.b-column").each((i, element) => {
        const headline = getHeadline($(element));
        if (headline.title && headline.link) headlines.push(headline);
      });       

      addHeadlines(headlines)
      .then(() => renderHeadlines(req, res, false));
    })
  });

  app.put("/api/save", (req, res) => {
    const id = req.body.id;
    const update = { saved: true };
    const options = { new: true, 
                      runValidators: true };

    db.News.findByIdAndUpdate(id, update, options, (error, result) => {
      var response = { id: id };

      error ? response.error = "Error occurred"
            : response.message = "Headline saved";

      res.json(response);
    });
  });

  app.delete("/api/delete", (req, res) => {
    const id = req.body.id;

    db.News.findByIdAndRemove(id, (error, result) => { 
      var response = { id: id };

      error ? response.error = "Error occurred"
            : response.message = "Headline deleted";

      res.json(response);
    });
  });
};
