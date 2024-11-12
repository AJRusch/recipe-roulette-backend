const router = require("express").Router();
const {
  getRecipeItems,
  createRecipecard,
  deleteRecipeCard,
  favoriteItem,
  unFavoriteItem,
} = require("../controllers/recipeItems");

const {
  validateRecipeCardId,
  validateRecipeCard,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.get("/", getRecipeItems);
router.use(auth);
router.post("/", validateRecipeCard, createRecipecard);
router.delete("/:recipeId", validateRecipeCardId, deleteRecipeCard);
router.put("/:recipedId/favorites", validateRecipeCardId, favoriteItem);
router.delete("/:recipedId/favorites", validateRecipeCardId, unFavoriteItem);

module.exports = router;
