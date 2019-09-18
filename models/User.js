const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true
  },
  password: String
});

UserSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

module.exports = mongoose.model("user", UserSchema);
