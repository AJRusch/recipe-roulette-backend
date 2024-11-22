const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
const { searchRecipes, getRecipeSummary } = require("./utils/recipe-api");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");

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
app.use(requestLogger);
app.use("/", mainRouter);
app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page);

  const results = await searchRecipes(searchTerm, page);
  console.log({ results });
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  const results = await getRecipeSummary(recipeId);
  return res.json(results);
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
