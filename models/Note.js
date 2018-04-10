const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var NoteSchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
