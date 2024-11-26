const RecipeCard = require("../models/recipes");
const BadRequestError = require("../utils/error-constructors/BadRequestError");
const NotFoundError = require("../utils/error-constructors/NotFoundError");
const ForbiddenError = require("../utils/error-constructors/ForbiddenError");
const { SUCCESSFUL_REQUEST } = require("../utils/successStatus");

const getRecipeItems = (req, res, next) => {
  RecipeCard.find({ owner: req.user._id })
    .then((recipes) => res.status(SUCCESSFUL_REQUEST).send(recipes))
    .catch(next);
};

const saveRecipe = (req, res, next) => {
  const { title, summary, imageUrl } = req.body;
  RecipeCard.create({ title, summary, imageUrl, owner: req.user._id })
    .then((recipe) => {
      res.send({ data: recipe });
      console.log(req.body);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid recipe data provided"));
      }
      return next(err);
    });
};

const createRecipecard = (req, res, next) => {
  const { title, summary, imageUrl } = req.body;

  RecipeCard.create({ title, summary, imageUrl, owner: req.user._id })
    .then((recipe) => {
      res.send({ data: recipe });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid Data"));
      }
      return next(err);
    });
};

const deleteRecipeCard = (req, res, next) => {
  const { recipeId } = req.params;
  const userId = req.user._id;

  RecipeCard.findById(recipeId)
    .orFail()
    .then((recipe) => {
      if (recipe.owner.toString() !== userId) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }
      return RecipeCard.findByIdAndDelete(recipeId);
    })
    .then((recipe) => res.send({ recipe }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Recipe not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid recipe ID"));
      }
      return next(err);
    });
};

module.exports = {
  getRecipeItems,
  saveRecipe,
  createRecipecard,
  deleteRecipeCard,
};
