const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const searchRecipes = require("./utils/recipe-api");
const getRecipeSummary = require("./utils/recipe-api");

const app = express();
const { PORT = 3002 } = process.env;

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/recipe-collection-db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page);

  const results = await searchRecipes(searchTerm, page);
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  const results = await getRecipeSummary(recipeId);
  return res.json(results);
});
