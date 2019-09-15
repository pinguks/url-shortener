const Url = require("../models/Url");
const { isURL } = require("validator");
const generateShortUrl = require("../utils/generateShortUrl");

exports.generateShortUrlAndSaveToDB = async (req, res) => {
  const { originalUrl } = req.body;

  if (!isURL(originalUrl.trim())) {
    res.status(400).json({ error: "Please provide a valid URL!" });
    return;
  }

  let shortenedUrl = generateShortUrl();
  let isNotUnique = true;

  // try to find if the generated url exists. generate a new one until no match

  do {
    const exists = await Url.findOne({ shortenedUrl });

    if (exists) {
      shortenedUrl = generateShortUrl();
    } else {
      isNotUnique = false;
    }
  } while (isNotUnique);

  // save to db and send

  const newUrl = await Url.create({ originalUrl, shortenedUrl });

  res.json({
    originalUrl: newUrl.originalUrl,
    shortenedUrl: newUrl.shortenedUrl
  });
};

exports.getLongUrlAndRedirect = async (req, res) => {
  const url = await Url.findOne({ shortenedUrl: req.params.url });

  if (!url) {
    res.redirect("/");
    return;
  }

  res.redirect(url.originalUrl);
};
