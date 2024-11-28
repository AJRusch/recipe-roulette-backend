const router = require("express").Router();
const { createUser, loginUser } = require("../controllers/users");
const {
  validateUserLogin,
  validateUserRegistration,
} = require("../middlewares/validation");

const userRouter = require("./users");
const recipeRouter = require("./recipes");

router.post("/signin", validateUserLogin, loginUser);
router.post("/signup", validateUserRegistration, createUser);
router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

module.exports = router;
