const Router = require("express").Router();

const {
  generateShortUrlAndSaveToDB,
  getLongUrlAndRedirect,
  login,
  register,
  getUserLinks
} = require("../controllers");

const auth = require("../middlewares/auth");

Router.post("/", auth, generateShortUrlAndSaveToDB);
Router.get("/redirect/:url", getLongUrlAndRedirect);
Router.post("/login", login);
Router.post("/register", register);
Router.get("/links", auth, getUserLinks);

module.exports = Router;
