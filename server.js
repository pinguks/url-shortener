const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

mongoose.connect(
  process.env.MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;

    app.listen(process.env.PORT || 5000);
  }
);
