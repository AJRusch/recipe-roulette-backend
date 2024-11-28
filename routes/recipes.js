const router = require("express").Router();
const {
  getRecipeItems,
  createRecipeCard,
  deleteRecipeCard,
  saveRecipe,
} = require("../controllers/recipeItems");

const {
  validateRecipeCardId,
  validateRecipeCard,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.get("/", auth, getRecipeItems);
router.post("/", auth, validateRecipeCard, saveRecipe);
router.post("/", validateRecipeCard, createRecipeCard);
router.delete("/:recipeId", auth, validateRecipeCardId, deleteRecipeCard);

module.exports = router;
