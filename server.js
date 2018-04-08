const express    = require("express");
const bodyParser = require("body-parser");
const mongoose   = require("mongoose");

const app = express();

const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const MONGODB_URI = 
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./controllers/news_controller")(app);

app.listen(port, () => console.log(`Server listening on: http://localhost:${port}`));