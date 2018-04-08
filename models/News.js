const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var NewsSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;
