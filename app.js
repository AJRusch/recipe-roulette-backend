const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const { errors } = require("celebrate");
const { limiter } = require("./utils/rate-limit");
const mainRouter = require("./routes/index");
const { searchRecipes, getRecipeSummary } = require("./utils/recipe-api");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const { mongoServerAddress } = require("./utils/config");
/*const corsOptions = {
  origin: [
    "https://reciperoulette.twilightparadox.com",
    "https://www.reciperoulette.twilightparadox.com",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}; */

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const { PORT = 3002 } = process.env;

app.listen(PORT);

mongoose
  .connect(mongoServerAddress)
  .then(() => {})
  .catch(console.error);

app.use(helmet());
//app.use(cors());
app.use(cors(corsOptions));

app.use(limiter);
app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);
app.get("/api/recipes/search", async (req, res) => {
  const { searchTerm } = req.query;
  const page = parseInt(req.query.page, 12);

  const results = await searchRecipes(searchTerm, page);
  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const { recipeId } = req.params;
  const results = await getRecipeSummary(recipeId);
  return res.json(results);
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
