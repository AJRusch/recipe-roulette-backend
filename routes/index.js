const router = require("express").Router();
const NotFoundError = require("../utils/error-constructors/NotFoundError");
const { createUser, loginUser } = require("../controllers/users");
const {
  validateUserLogin,
  validateUserRegistration,
} = require("../middlewares/validation");

const userRouter = require("./users");

router.post("/signin", validateUserLogin, loginUser);
router.post("/signup", validateUserRegistration, createUser);
router.use("/users", userRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Not found"));
});

module.exports = router;
