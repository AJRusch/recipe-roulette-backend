const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./users");

const recipeCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 4,
  },

  summary: {
    type: String,
    required: true,
    minLength: 20,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("recipe", recipeCardSchema);
