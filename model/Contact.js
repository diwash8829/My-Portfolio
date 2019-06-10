const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  message: String
});

module.exports = mongoose.model("Contact", contactSchema);