const Router = require("express").Router();

const {
  generateShortUrlAndSaveToDB,
  getLongUrlAndRedirect
} = require("../controllers");

Router.post("/", generateShortUrlAndSaveToDB);
Router.get("/:url", getLongUrlAndRedirect);

module.exports = Router;
