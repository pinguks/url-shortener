const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { isURL } = require("validator");
const app = express();

const Url = require("./models/Url");

const generateShortUrl = require("./utils/generateShortUrl");

app.use(express.json());

app.post("/", async (req, res) => {
  const { url: originalUrl } = req.body;

  console.log(req.body.url);

  if (!isURL(originalUrl)) {
    res.status(400).json({ error: "Please provide a valid URL!" });
    return;
  }

  let shortenedUrl = generateShortUrl();

  let notFound = true;

  do {
    const exists = await Url.findOne({ shortenedUrl });

    if (exists) {
      shortenedUrl = generateShortUrl();
    } else {
      notFound = false;
    }
  } while (notFound);

  const newUrl = await Url.create({ originalUrl, shortenedUrl });

  res.json({
    originalUrl: newUrl.originalUrl,
    shortenedUrl: newUrl.shortenedUrl
  });
});

app.get("/:url", async (req, res) => {
  const url = await Url.findOne({ shortenedUrl: req.params.url });

  if (!url) {
    res.redirect("/");
    return;
  }

  res.redirect(url.originalUrl);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

mongoose.connect(
  "mongodb+srv://admin:admin@url-short-xofqg.mongodb.net/urlshortener",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;

    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000);
  }
);
