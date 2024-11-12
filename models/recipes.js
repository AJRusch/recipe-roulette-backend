const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./users");

const recipeCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 40,
  },

  summary: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 600,
  },

  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },

  favorites: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("recipe", recipeCardSchema);
