const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Url = require("../models/Url");
const User = require("../models/User");

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

    if (exists) shortenedUrl = generateShortUrl();
    else isNotUnique = false;
  } while (isNotUnique);

  // save to db and send

  let newUrl;

  if (req.user) {
    newUrl = await Url.create({
      originalUrl,
      shortenedUrl,
      user: req.user._id
    });
  } else {
    newUrl = await Url.create({ originalUrl, shortenedUrl });
  }

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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches) {
      const token = jwt.sign({ id: user.id }, "secrett");

      res.json({ token });
      return;
    }
  }

  res.status(400).json({ error: "User email/password do not match." });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const user = await User.create({ email, password });

    const token = jwt.sign({ id: user.id }, "secrett");

    res.json({ token });
    return;
  }

  res.status(400).json({ error: "User already exists, please log in." });
};

exports.getUserLinks = async (req, res) => {
  if (!req.user) {
    res.json({ error: "Please login." });
    return;
  }

  const links = await Url.find({ user: req.user._id });

  res.json(links);
};
