const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId
  },
  originalUrl: {
    type: String,
    trim: true
  },
  shortenedUrl: {
    type: String
  }
});

module.exports = mongoose.model("url", UrlSchema);
